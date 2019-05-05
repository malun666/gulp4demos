const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemap = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

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

// 可以指定当前的任务（函数任务）的名字， 开发环境使用的版本
// 1. 进行样式的预处理（sass → css）
// 2. 代码进行合并, 排除掉已经合并的main.css文件。
// 3. sourcemap处理
// 4. 给css3的样式打上自动前缀。
// 5. 压缩css
// 6. 给main.css文件打上版本号。
function style() {
  return gulp.src(['./src/style/**/*.{scss,css}', '!./src/style/main.css'])
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 0.1% in CN'], // 支持的浏览器的版本
      cascade: true  // 设定最终生成的css的样式
    }))
    .pipe(concat('main.css'))
    .pipe(sourcemap.write())
    .pipe(gulp.dest('./src/style/'));
}
style.displayName = 'style:dev'; // 可以指定非函数名字的任务名
gulp.task(style);

// 生产环境使用的版本
// 6. 给main.css文件打上版本号。
function stylePro() {
  return gulp.src(['./src/style/**/*.{scss,css}', '!./src/style/main.css'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 0.1% in CN'], // 支持的浏览器的版本
      cascade: true  // 设定最终生成的css的样式
    }))
    .pipe(concat('main.css'))
    .pipe(cleanCss({
      compatibility: 'ie8', // 兼容IE8浏览器
      // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(rev()) // 给main.css生成版本的映射的文件
    .pipe(gulp.dest('./dist/style/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./src/style/')) // 把映射文件存到
}
gulp.task(stylePro);



// 注册一个任务， 串行的执行 html  style:pro 
// gulp.series帮助我们顺序（串行）执行多个任务的能力。
gulp.task('htmlstyle', gulp.series(html, 'style:dev'));

// 注册一个任务， 并行执行多个任务
gulp.task('htmlstyle_para', gulp.parallel(html, 'style:dev'));

gulp.task('htmlnest', gulp.series(
  html, 
  gulp.parallel(html, 'style:dev'), // 并行执行多个任务。参数可以是任意多个，可以是方法名字，可以是任务名字。
  gulp.series('html', 'html')
));

// 实现从 src/assets/下所有的文件都拷贝到  dist/下面的assets
function copy() {
  // task方法： 接受一个cb回调函数，在任务结束的时候执行以下cb回调函数。
  // 方法：可以返回一个流
  // 方法： 返回一个promise也是可以。
  return gulp.src(['src/assets/**/*.*', 'src/lib/**/*.*'], { base: 'src/'}) // node 一个流 pipe
  .pipe(gulp.dest('dist/')); // gulp.dest：把所有文件保存到xxx地方。
}

gulp.task(copy);
