<#
.SYNOPSIS
  Captures one screenshot per Bikkuri theme variant by driving a throwaway VS Code profile.

.DESCRIPTION
  Launches VS Code with its own --user-data-dir / --extensions-dir (so nothing touches the
  user's real setup), opens the sample files, splits them into columns, sizes the window to
  an exact pixel rect, then loops over every theme declared in package.json: writes
  "workbench.colorTheme" into the profile settings, waits for VS Code to apply it live, and
  grabs the window.

  Every run rebuilds the same window from scratch, so the 20 frames differ only in colour.

  Raw PNGs land in temp/screenshots/. Run scripts/screenshots/postprocess.js afterwards to
  verify + convert them to the WebP files in assets/.

.EXAMPLE
  pwsh -File scripts/screenshots/capture.ps1
    Captures all 20 variants.

.EXAMPLE
  pwsh -File scripts/screenshots/capture.ps1 -Only '*light-warm*' -KeepOpen
    Captures a subset (wildcards match the output file name) and leaves VS Code open.
#>
[CmdletBinding()]
param(
  # Leave VS Code running after the capture loop (handy while tuning the layout).
  [switch]$KeepOpen,
  # Window size in logical (CSS) pixels - i.e. how big the window looks on screen.
  [int]$LogicalWidth = 2048,
  [int]$LogicalHeight = 1152,
  # Display scale factor. Capture happens in physical pixels: logical * Dpr.
  [double]$Dpr = 1.5,
  # How long to wait after switching theme before grabbing the frame.
  [int]$SettleMs = 1400,
  # How long to wait after the window appears before the first capture.
  [int]$StartupMs = 7000,
  # Wildcards filtering which variants to capture, e.g. '*light*'.
  [string[]]$Only,
  # Files shown in the screenshot, left column first.
  [string[]]$Files = @('samples\sample.html', 'samples\sample.ts', 'samples\sample.json')
)

$ErrorActionPreference = 'Stop'

# --------------------------------------------------------------------------------------
# Win32 interop. SetProcessDpiAwarenessContext must run before System.Drawing/Forms load,
# otherwise Windows lies to us in logical pixels (3413x1440 instead of 5120x2160).
# --------------------------------------------------------------------------------------
Add-Type -Namespace Bikkuri -Name Native -MemberDefinition @'
  [StructLayout(LayoutKind.Sequential)]
  public struct RECT { public int Left, Top, Right, Bottom; }

  [DllImport("user32.dll")] public static extern bool SetProcessDpiAwarenessContext(IntPtr ctx);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT r);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr after, int x, int y, int cx, int cy, uint flags);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int cmd);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr hWnd, IntPtr hdc, uint flags);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] public static extern bool AttachThreadInput(uint from, uint to, bool attach);
  [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr hWnd);
  [DllImport("kernel32.dll")] public static extern uint GetCurrentThreadId();
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern int GetWindowTextLength(IntPtr hWnd);
  [DllImport("user32.dll", CharSet = CharSet.Unicode)] public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder s, int max);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint pid);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc cb, IntPtr param);
  [DllImport("dwmapi.dll")] public static extern int DwmGetWindowAttribute(IntPtr hWnd, int attr, out RECT val, int size);
  [DllImport("dwmapi.dll")] public static extern int DwmSetWindowAttribute(IntPtr hWnd, int attr, ref int val, int size);

  public delegate bool EnumProc(IntPtr hWnd, IntPtr param);

  public static System.Collections.Generic.List<IntPtr> WindowsOf(uint pid) {
    var list = new System.Collections.Generic.List<IntPtr>();
    EnumWindows((h, p) => {
      uint wpid; GetWindowThreadProcessId(h, out wpid);
      if (wpid == pid && IsWindowVisible(h) && GetWindowTextLength(h) > 0) list.Add(h);
      return true;
    }, IntPtr.Zero);
    return list;
  }

  // Windows refuses SetForegroundWindow to a background process unless we briefly attach to
  // the foreground thread's input queue. Needed so the seed pass can send keystrokes.
  public static void Focus(IntPtr hWnd) {
    uint ignored;
    uint foreground = GetWindowThreadProcessId(GetForegroundWindow(), out ignored);
    uint target = GetWindowThreadProcessId(hWnd, out ignored);
    uint self = GetCurrentThreadId();
    AttachThreadInput(self, foreground, true);
    AttachThreadInput(self, target, true);
    ShowWindow(hWnd, 9);
    BringWindowToTop(hWnd);
    SetForegroundWindow(hWnd);
    AttachThreadInput(self, target, false);
    AttachThreadInput(self, foreground, false);
  }

  public static string TitleOf(IntPtr hWnd) {
    var sb = new System.Text.StringBuilder(512);
    GetWindowText(hWnd, sb, sb.Capacity);
    return sb.ToString();
  }
'@

# DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2 = -4
[void][Bikkuri.Native]::SetProcessDpiAwarenessContext([IntPtr]::new(-4))
Add-Type -AssemblyName System.Drawing

$DWMWA_EXTENDED_FRAME_BOUNDS = 9
$DWMWA_WINDOW_CORNER_PREFERENCE = 33
$DWMWCP_DONOTROUND = 1
$SWP_NOZORDER = 0x0004
$SWP_NOACTIVATE = 0x0010
$SW_RESTORE = 9

# --------------------------------------------------------------------------------------
# Paths
# --------------------------------------------------------------------------------------
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..' '..')).Path
$profileDir = Join-Path $repoRoot 'temp\screenshot-profile'
$extDir = Join-Path $repoRoot 'temp\screenshot-extensions'
$outDir = Join-Path $repoRoot 'temp\screenshots'
$seedSettings = Join-Path $PSScriptRoot 'profile\settings.json'
$userSettings = Join-Path $profileDir 'User\settings.json'

$targetW = [int]([math]::Round($LogicalWidth * $Dpr))
$targetH = [int]([math]::Round($LogicalHeight * $Dpr))

New-Item -ItemType Directory -Force -Path $profileDir, (Split-Path $userSettings), $extDir, $outDir | Out-Null

# Drop any hot-exit backups so the editors always show what is on disk.
Remove-Item (Join-Path $profileDir 'Backups') -Recurse -Force -ErrorAction SilentlyContinue

# Expose the in-repo theme to VS Code without packaging: copy just the extension manifest
# and the generated themes into the throwaway extensions dir. (A junction to the repo would
# make VS Code watch the whole working tree and pop up "Extensions have been modified on
# disk" toasts as soon as anything unrelated changes.)
$extCopy = Join-Path $extDir 'bikkuri-theme'
Remove-Item $extCopy -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path (Join-Path $extCopy 'dist') | Out-Null
Copy-Item (Join-Path $repoRoot 'package.json') $extCopy
Copy-Item (Join-Path $repoRoot 'dist\*.json') (Join-Path $extCopy 'dist')

# Themes are the single source of truth in package.json.
$pkg = Get-Content (Join-Path $repoRoot 'package.json') -Raw | ConvertFrom-Json
$variants = $pkg.contributes.themes | ForEach-Object {
  [pscustomobject]@{
    Label = $_.label
    Name  = [System.IO.Path]::GetFileNameWithoutExtension($_.path)
  }
}
if ($Only) {
  $variants = $variants | Where-Object { $v = $_; $Only | Where-Object { $v.Name -like $_ } }
}
if (-not $Seed -and -not $variants) { throw 'No theme variants matched -Only.' }

function Set-ThemeSetting([string]$label) {
  $json = Get-Content $seedSettings -Raw | ConvertFrom-Json
  $json.'workbench.colorTheme' = $label
  # Write via a temp file + move so VS Code's watcher never sees a half-written file.
  $tmp = "$userSettings.tmp"
  $json | ConvertTo-Json -Depth 10 | Set-Content -Path $tmp -Encoding utf8
  Move-Item -Path $tmp -Destination $userSettings -Force
}

function Set-ArrangeKeybinding([string[]]$files) {
  # The layout is built by a short series of F-key macros bound through VS Code's
  # "runCommands" rather than by sending a dozen chords: single keys are far less likely to
  # be swallowed, and each macro is one indivisible step.
  #   F13         start over: no editors, then one empty column per file
  #   F14, F15..  focus column N and open file N into it
  # The columns are created up front so that each open only has to focus a group that
  # already exists - splitting and opening inside one macro races. F13 makes the sequence
  # idempotent. (SendKeys only speaks {F1}..{F16}, hence at most five files.)
  $ordinals = @('First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth')
  $columnLayouts = @{ 2 = 'Two'; 3 = 'Three'; 4 = 'Four'; 5 = 'Five' }
  if (-not $columnLayouts.ContainsKey($files.Count)) {
    throw "-Files takes 2 to 5 files (got $($files.Count))."
  }

  $binding = @(
    @{
      key     = 'f13'
      command = 'runCommands'
      args    = @{
        commands = @(
          'workbench.action.joinAllGroups'
          'workbench.action.closeAllEditors'
          "workbench.action.editorLayout$($columnLayouts[$files.Count])Columns"
        )
      }
    }
  )

  for ($column = 0; $column -lt $files.Count; $column++) {
    $uri = 'file:///' + ((Join-Path $repoRoot $files[$column]) -replace '\\', '/')
    $binding += @{
      key     = "f$(14 + $column)"
      command = 'runCommands'
      args    = @{
        commands = @(
          "workbench.action.focus$($ordinals[$column])EditorGroup"
          @{ command = 'vscode.open'; args = $uri }
        )
      }
    }
  }
  # -AsArray matters: keybindings.json has to stay a JSON array even with a single binding.
  $binding | ConvertTo-Json -Depth 10 -AsArray |
    Set-Content -Path (Join-Path $profileDir 'User\keybindings.json') -Encoding utf8
}

function Get-FrameRect([IntPtr]$hWnd) {
  $r = New-Object 'Bikkuri.Native+RECT'
  $hr = [Bikkuri.Native]::DwmGetWindowAttribute($hWnd, $DWMWA_EXTENDED_FRAME_BOUNDS, [ref]$r, 16)
  if ($hr -ne 0) { throw "DwmGetWindowAttribute failed (0x$($hr.ToString('x')))" }
  [pscustomobject]@{ X = $r.Left; Y = $r.Top; W = $r.Right - $r.Left; H = $r.Bottom - $r.Top }
}

function Set-FrameSize([IntPtr]$hWnd, [int]$x, [int]$y, [int]$w, [int]$h) {
  # SetWindowPos sizes the *window* rect, which includes an invisible resize border.
  # Measure the difference against the visible (DWM) frame and compensate.
  [void][Bikkuri.Native]::ShowWindow($hWnd, $SW_RESTORE)
  $flags = $SWP_NOZORDER -bor $SWP_NOACTIVATE
  [void][Bikkuri.Native]::SetWindowPos($hWnd, [IntPtr]::Zero, $x, $y, $w, $h, $flags)
  for ($i = 0; $i -lt 3; $i++) {
    Start-Sleep -Milliseconds 250
    $wr = New-Object 'Bikkuri.Native+RECT'
    [void][Bikkuri.Native]::GetWindowRect($hWnd, [ref]$wr)
    $frame = Get-FrameRect $hWnd
    $dw = ($wr.Right - $wr.Left) - $frame.W
    $dh = ($wr.Bottom - $wr.Top) - $frame.H
    $dx = $frame.X - $wr.Left
    $dy = $frame.Y - $wr.Top
    if ($frame.W -eq $w -and $frame.H -eq $h) { break }
    [void][Bikkuri.Native]::SetWindowPos($hWnd, [IntPtr]::Zero, ($x - $dx), ($y - $dy), ($w + $dw), ($h + $dh), $flags)
  }
  Get-FrameRect $hWnd
}

function Test-BlankBitmap([System.Drawing.Bitmap]$bmp) {
  # PrintWindow occasionally hands back an empty surface for GPU-composited windows.
  for ($x = 4; $x -lt $bmp.Width; $x += 97) {
    for ($y = 4; $y -lt $bmp.Height; $y += 89) {
      $c = $bmp.GetPixel($x, $y)
      if ($c.R -ne 0 -or $c.G -ne 0 -or $c.B -ne 0) { return $false }
    }
  }
  return $true
}

function Save-Screenshot([IntPtr]$hWnd, [string]$path) {
  # PrintWindow renders the window's own surface, so the capture survives the window being
  # occluded, unfocused, or the session being locked. CopyFromScreen is the fallback.
  $wr = New-Object 'Bikkuri.Native+RECT'
  [void][Bikkuri.Native]::GetWindowRect($hWnd, [ref]$wr)
  $frame = Get-FrameRect $hWnd

  $shot = New-Object System.Drawing.Bitmap ($wr.Right - $wr.Left), ($wr.Bottom - $wr.Top)
  try {
    $g = [System.Drawing.Graphics]::FromImage($shot)
    $hdc = $g.GetHdc()
    # PW_RENDERFULLCONTENT = 2
    $ok = [Bikkuri.Native]::PrintWindow($hWnd, $hdc, 2)
    $g.ReleaseHdc($hdc)
    $g.Dispose()

    if ($ok -and -not (Test-BlankBitmap $shot)) {
      # Trim the invisible resize border so the frame matches the target size exactly.
      $crop = New-Object System.Drawing.Rectangle ($frame.X - $wr.Left), ($frame.Y - $wr.Top), $frame.W, $frame.H
      $cropped = $shot.Clone($crop, $shot.PixelFormat)
      try { $cropped.Save($path, [System.Drawing.Imaging.ImageFormat]::Png) } finally { $cropped.Dispose() }
      return
    }
  } finally { $shot.Dispose() }

  Write-Warning 'PrintWindow returned nothing; falling back to a screen grab (window must be visible).'
  $bmp = New-Object System.Drawing.Bitmap $frame.W, $frame.H
  try {
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    try {
      $g.CopyFromScreen($frame.X, $frame.Y, 0, 0,
        (New-Object System.Drawing.Size($frame.W, $frame.H)),
        [System.Drawing.CopyPixelOperation]::SourceCopy)
    } finally { $g.Dispose() }
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally { $bmp.Dispose() }
}

# --------------------------------------------------------------------------------------
# Launch VS Code against the throwaway profile
# --------------------------------------------------------------------------------------
if (Get-Process LogonUI -ErrorAction SilentlyContinue) {
  throw 'The session is locked. Unlock it before capturing - a locked screen freezes the frames.'
}

$codeCommand = Get-Command code -ErrorAction SilentlyContinue
if (-not $codeCommand) { throw "VS Code CLI 'code' not found on PATH." }
# code.cmd lives in <install>\bin, Code.exe one level up. Launch the exe directly so we own
# the process handle (and can find its windows by pid).
$codeExe = Join-Path (Split-Path (Split-Path $codeCommand.Source)) 'Code.exe'
if (-not (Test-Path $codeExe)) { throw "Code.exe not found next to $($codeCommand.Source)" }

Set-ThemeSetting $variants[0].Label
Set-ArrangeKeybinding $Files

$codeArgs = @(
  '--new-window'
  '--user-data-dir', $profileDir
  '--extensions-dir', $extDir
  '--disable-workspace-trust'
  '--skip-release-notes'
  '--disable-telemetry'
  $repoRoot
)
$codeArgs += $Files | ForEach-Object { Join-Path $repoRoot $_ }

Write-Host "Launching VS Code (profile: $profileDir)"
$proc = Start-Process -FilePath $codeExe -ArgumentList $codeArgs -PassThru

$hWnd = [IntPtr]::Zero
$deadline = (Get-Date).AddSeconds(60)
while ((Get-Date) -lt $deadline) {
  Start-Sleep -Milliseconds 400
  $candidates = [Bikkuri.Native]::WindowsOf([uint32]$proc.Id)
  if ($candidates.Count -gt 0) { $hWnd = $candidates[0]; break }
}
if ($hWnd -eq [IntPtr]::Zero) { throw 'Timed out waiting for the VS Code window.' }
Write-Host "Window: $([Bikkuri.Native]::TitleOf($hWnd))"

# Square off the Win11 rounded corners so the capture has no desktop bleed.
$corner = $DWMWCP_DONOTROUND
[void][Bikkuri.Native]::DwmSetWindowAttribute($hWnd, $DWMWA_WINDOW_CORNER_PREFERENCE, [ref]$corner, 4)

Add-Type -AssemblyName System.Windows.Forms
$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
if ($targetW -gt $screen.Width -or $targetH -gt $screen.Height) {
  throw "Target capture ${targetW}x${targetH} does not fit the screen ($($screen.Width)x$($screen.Height)). Lower -LogicalWidth/-LogicalHeight."
}
$posX = [int](($screen.Width - $targetW) / 2)
$posY = [int][math]::Max(0, ($screen.Height - $targetH) / 3)

$frame = Set-FrameSize $hWnd $posX $posY $targetW $targetH
[void][Bikkuri.Native]::SetForegroundWindow($hWnd)
Write-Host "Frame: $($frame.W)x$($frame.H) at $($frame.X),$($frame.Y) (target ${targetW}x${targetH})"
if ($frame.W -ne $targetW -or $frame.H -ne $targetH) {
  Write-Warning 'Window frame does not match the target exactly; postprocess will resize to the nominal width anyway.'
}

Start-Sleep -Milliseconds $StartupMs

# --------------------------------------------------------------------------------------
# Arrange the editors. The files open as tabs in a single group; each one after the first
# has to be pushed into its own group so they end up side by side. VS Code does not restore
# an editor layout across launches here, so this runs on every capture.
#
# The whole arrangement is bound to one key (F13) via the profile's keybindings.json and run
# with VS Code's "runCommands", so a single keystroke does all of it - sending a dozen
# separate chords was unreliable, one dropped key left the layout wrong. It starts by
# joining all groups, which makes pressing the key twice harmless.
# --------------------------------------------------------------------------------------
$shell = New-Object -ComObject WScript.Shell
$arrangeKeys = @('{F13}') + (14..(13 + $Files.Count) | ForEach-Object { "{F$_}" })
foreach ($key in $arrangeKeys) {
  [void]$shell.AppActivate([int]$proc.Id)
  [Bikkuri.Native]::Focus($hWnd)
  Start-Sleep -Milliseconds 300
  $shell.SendKeys($key)
  Start-Sleep -Milliseconds 900
}
Start-Sleep -Milliseconds 1500

# --------------------------------------------------------------------------------------
# Capture loop
# --------------------------------------------------------------------------------------
$i = 0
$previousHash = $null
foreach ($variant in $variants) {
  $i++
  Set-ThemeSetting $variant.Label
  $path = Join-Path $outDir "$($variant.Name).png"

  # Chromium stops painting when its window is occluded, which would leave PrintWindow
  # handing back the previous theme. Keep the window up front and re-grab until the frame
  # actually changes - two Bikkuri variants never render identically.
  $hash = $null
  for ($attempt = 1; $attempt -le 6; $attempt++) {
    [Bikkuri.Native]::Focus($hWnd)
    Start-Sleep -Milliseconds $SettleMs
    Save-Screenshot $hWnd $path
    $hash = (Get-FileHash $path -Algorithm SHA1).Hash
    if ($hash -ne $previousHash) { break }
  }
  if ($hash -eq $previousHash) {
    Write-Warning "$($variant.Name): frame did not change - the theme may not have applied."
  }
  $previousHash = $hash
  Write-Host ("[{0,2}/{1}] {2}" -f $i, $variants.Count, $variant.Name)
}

if (-not $KeepOpen) {
  $proc | Stop-Process -Force -ErrorAction SilentlyContinue
}

Write-Host ''
Write-Host "$($variants.Count) frames written to $outDir"
Write-Host 'Next: node scripts/screenshots/postprocess.js'
