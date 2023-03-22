const gulp = require('gulp');
const watch = require('gulp-watch');
const { spawn } = require('child_process');



let watchPaths = [
  'colors/',
  'schemes/',
  'templates/',
  'theme-generator.py'
]


let generator = 'theme-generator.py'

gulp.task('watch', function() {
  watch(watchPaths, function() {
    console.log('Regenerating theme...');
    const python = spawn('python', [generator]);

    // listens for data events emitted by the standard output stream (stdout) of the child process spawned by the spawn function.
    python.stdout.on('data', function(data) {
      console.log(data.toString());
    });
    python.stderr.on('data', function(data) {
      console.error(data.toString());
    });
  });
});