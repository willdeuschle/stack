/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
    allSrcJs: 'src/**/*.js?(x)',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    clientEntryPoint: 'src/client/app.jsx',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
};

gulp.task('main', ['lint'], () =>
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist'))
);

gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);

gulp.task('build', ['lint'], () =>
    gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest('lib'))
);

gulp.task('lint', () =>
    gulp.src([
        paths.allSrcJs,
        paths.gulpFile,
        paths.webpackFile,
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);
