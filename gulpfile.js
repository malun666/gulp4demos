const gulp = require('gulp');

// 第一个参数： 任务的名字， 第二个参数是具体要执行的任务。
gulp.task('default', function(cb) {
  console.log('gulp is running ...');
  cb();
});

// gulp4.0 注册一个任务的时候，直接可以把一个方法注册成为一个任务。
function html(cb) {  // 接收一个回调函数作为参数，此回调函数执行后，告诉gulp当前任务执行完成。
  console.log('html 任务执行了...');
  cb(); // 告诉gulp，当前的任务执行完成。
}

gulp.task(html);

// 可以指定当前的任务（函数任务）的名字

function style(cb) {
  console.log('style is running ....');
  cb();
}
style.displayName = 'style:pro'; // 可以指定非函数名字的任务名
gulp.task(style);


// 注册一个任务， 串行的执行 html  style:pro 
// gulp.series帮助我们顺序（串行）执行多个任务的能力。
gulp.task('htmlstyle', gulp.series(html, 'style:pro'));

// 注册一个任务， 并行执行多个任务
gulp.task('htmlstyle_para', gulp.parallel(html, 'style:pro'));

gulp.task('htmlnest', gulp.series(
  html, 
  gulp.parallel(html, 'style:pro'), // 并行执行多个任务。参数可以是任意多个，可以是方法名字，可以是任务名字。
  gulp.series('html', 'html')
));

