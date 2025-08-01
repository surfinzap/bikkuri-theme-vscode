const gulp = require('gulp');
const watch = require('gulp-watch');
const { spawn } = require('child_process');

let watchPaths = ['src/**/*', 'scripts/**/*'];

gulp.task('watch', function () {
  watch(watchPaths, function () {
    runScript('generate-schemes.js');
    runScript('generate-themes.js');
  });
});

function runScript(scriptName) {
  const command = 'node';
  const args = [`scripts/${scriptName}`];

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
