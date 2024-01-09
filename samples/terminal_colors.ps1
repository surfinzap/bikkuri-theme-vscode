# PowerShell script to display ANSI color codes
# run as .\samples\terminal_colors.ps1
30..37 + 90..97 + 39 | ForEach-Object {
    $esc = [char]27 # ESC character
    Write-Host "$esc[$($_)m ANSI Color Code: $_ $esc[0m"
}