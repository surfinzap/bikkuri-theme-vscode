const gulp = require('gulp');
const watch = require('gulp-watch');
const { spawn } = require('child_process');

let watchPaths = ['src/**/*', 'scripts/**/*'];

gulp.task('watch', function () {
  watch(watchPaths, function () {
    console.log('Regenerating schemes and themes...');

    runScript('generate-schemes.js');
    runScript('generate-themes.py');
  });
});

function runScript(scriptName) {
  let command;
  let args;

  if (scriptName.endsWith('.py')) {
    command = 'python'; 
    args = [`scripts/${scriptName}`];
  } else if (scriptName.endsWith('.js')) {
    command = 'node';
    args = [`scripts/${scriptName}`];
  } else {
    console.error('Unsupported script type:', scriptName);
    return;
  }

  const process = spawn(command, args);

  process.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  process.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  process.on('error', (err) => {
    console.error('Failed to start subprocess.', err);
  });
}
