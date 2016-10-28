// http://blog.rangle.io/angular-gulp-bestpractices/

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins(),
	browserSync = require('browser-sync');

// var config = require('./src/config.js');
var Config = require('./src/config'),
    config = new Config();


// https://www.smashingmagazine.com/2014/06/building-with-gulp/

gulp.task('lintjs', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'));

});

gulp.task('lintjsapi', function() {
	return gulp.src('src/api/**/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'));

});

gulp.task('lintjscas', function() {
	return gulp.src('src/cas/**/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'));

});

//$ gulp js
gulp.task('js', function() {
	return gulp.src('web/js/**/*.js')
		.pipe(plugins.uglify())
		.pipe(plugins.concat('app.js'))
		.pipe(gulp.dest('dist/public/js'));
});

gulp.task('css', function() {
	return gulp.src('web/css/**/*.css')
		.pipe(plugins.concat('style.css'))
		.pipe(gulp.dest('dist/public/css'));
});

gulp.task('font', function() {
	return gulp.src('web/font/**/*.woff')
		.pipe(gulp.dest('dist/public/font'));
});

gulp.task('img', function() {
	return gulp.src('web/img/**/*.*')
		.pipe(gulp.dest('dist/public/img'));
});

gulp.task('components', function() {
	return gulp.src('web/components/**/*.html')
		.pipe(gulp.dest('dist/public/components'));
});

//wait for js and css to be copied across before injecting into index

gulp.task('index', ['js', 'css'], function() {
	var target = gulp.src('./web/index.html');
	// It's not necessary to read the files (will speed up things), we're only after their paths: 
	// https://github.com/klei/gulp-inject/wiki/Clarifying-injected-paths
	var sources = gulp.src(['./css/**/*.css', './js/**/*.js'], {
		read: false,
		cwd: __dirname + '/dist/public'
	});

	return target.pipe(plugins.inject(sources))
		.pipe(gulp.dest('./dist'));
});

gulp.task('copyphp', function() {
	return gulp.src('dev_tools/dnd-upload/*.php')
		.pipe(gulp.dest('dist'));
});

gulp.task('copyjssocialscss', function() {
	return gulp.src('web/jssocialscss/**/*.css')
		.pipe(gulp.dest('dist/public/jssocialscss'));
});

gulp.task('copycdn', function() {
	return gulp.src('web/cdn/**/*.*')
		.pipe(gulp.dest('dist/cdn'));
});

// globbing

// [
//  'public/*.less',
//  'public/**/*.less',
//  '!public/vendor/**/*.less'
// ]

// The first pattern will match any file with a LESS extension in the public folder.
// The second pattern does much the same, except that it matches files that might
// be in subfolders of public of any nesting level thanks to the special ** pattern.
// As you might’ve guessed, the last pattern works the same way as the second one does, except that the ! at the beginning indicates that matched files should be
// excluded from the results.
// $ gulp dist
// gulp.task('dist', ['img', 'font', 'components', 'js', 'css', 'index', 'copyphp']);
gulp.task('dist', ['img', 'font', 'components', 'js', 'css', 'index', 'copyjssocialscss', 'copycdn']);

gulp.task('clean', function() {
	return gulp.src('dist', {
			read: false
		})
		.pipe(plugins.clean());
});

//$ gulp
gulp.task('default', ['watch', 'nodemon', 'browser-sync', 'admin']);

gulp.task('watch', function() {

	var jswatcher = gulp.watch('web/js/**/*.js', ['js']);

	jswatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});

	var csswatcher = gulp.watch('web/css/**/*.css', ['css']);

	csswatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});

	var compwatcher = gulp.watch('web/components/**/*.html', ['components']);

	compwatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});

	var indexwatcher = gulp.watch('web/index.html', ['index']);

	indexwatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});

	var imgwatcher = gulp.watch('web/img/**/*.*', ['img']);

	imgwatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});


});


gulp.task('nodemon', function(cb) {

	var started = false;

	return plugins.nodemon({
		script: 'server.js'
	}).on('start', function() {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8081",
		files: ["dist/public/**/*.*"],
		browser: "google chrome",
		port: 8082,
	});
});

//insert source name to the database when deploying the app for very first time 
gulp.task('init-sources', function() {
	gulp.src('./src/cas/sources/sources.json')
		.pipe(plugins.mongodbData({
			mongoUrl: 'mongodb://127.0.0.1:27017/ena',
			collectionName: 'sourcemetas',
			dropCollection: true
		}));
});

//-----------------------------------------BUILD ADMIN INTERFACE ASSETS-----------------------------------

gulp.task('_js', function() {
	return gulp.src('admin/adminjs/**/*.js')
		.pipe(plugins.uglify())
		.pipe(plugins.concat('adminapp.js'))
		.pipe(gulp.dest('dist/admin/adminjs'));
});

gulp.task('_css', function() {
	return gulp.src('admin/admincss/**/*.css')
		.pipe(plugins.concat('style.css'))
		.pipe(gulp.dest('dist/admin/admincss'));
});

gulp.task('_font', function() {
	return gulp.src('admin/adminfont/**/*.woff')
		.pipe(gulp.dest('dist/admin/adminfont'));
});

gulp.task('_img', function() {
	return gulp.src('admin/adminimg/**/*.*')
		.pipe(gulp.dest('dist/admin/adminimg'));
});

gulp.task('_components', function() {
	return gulp.src('admin/admincomponents/**/*.html')
		.pipe(gulp.dest('dist/admin/admincomponents'));
});

gulp.task('_admin', ['_js', '_css'], function() {
	var target = gulp.src('./admin/admin.html');
	var sources = gulp.src(['./admincss/**/*.css', './adminjs/**/*.js'], {
		read: false,
		cwd: __dirname + '/dist/admin'
	});

	return target.pipe(plugins.inject(sources))
		.pipe(gulp.dest('./dist'));
});

// watch admin

gulp.task('watch_admin', function() {

	var jswatcher = gulp.watch('admin/adminjs/**/*.js', ['_js']);

	jswatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});

	var csswatcher = gulp.watch('admin/admincss/**/*.css', ['_css']);

	csswatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});

	var compwatcher = gulp.watch('admin/admincomponents/**/*.html', ['_components']);

	compwatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});

	var indexwatcher = gulp.watch('admin/admin.html', ['_admin']);

	indexwatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});

	var imgwatcher = gulp.watch('admin/adminimg/**/*.*', ['_img']);

	imgwatcher.on('ready', function(event) {
		console.log('-----------------------------------------------------------');
		console.log('Watching files ' + JSON.stringify(event._watched, null, '\t'));
		console.log('-----------------------------------------------------------');
	});

});


// gulp.task('admin', ['_img', '_font', '_components', '_js', '_css', '_admin', 'watch_admin']);
// gulp.task('admin', ['_img', '_font', '_components', '_js', '_css', '_admin', 'copyphp', 'watch_admin',  'nodemon']);
gulp.task('admin', ['_img', '_font', '_components', '_js', '_css', '_admin']);

gulp.task('devadmin', ['_img', '_font', '_components', '_js', '_css', '_admin','watch_admin',  'nodemon']);
