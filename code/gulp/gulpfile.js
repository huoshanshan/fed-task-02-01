// gulp 的入口文件
const {series, parallel, src, dest, watch} = require('gulp')
const del = require('del')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const browserSync = require('browser-sync')
const GulpUglify = require('gulp-uglify')
const bs = browserSync.create()

const clean = () => {
    return del(['dist', 'temp'])
}

const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }

//scss文件的读取和转换 使用gulp-sass插件 
const style = () => {
    return src('src/assets/styles/*.scss',{base:'src'})
        .pipe(plugins.sass({ outputStyle: 'expanded' })) // css {} 展开
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

//js文件的读取及转换 使用baleb @bable/core @babel/preset-env 插件
const script = () =>{
    return src('src/assets/scripts/*.js', {base:'src'})
        .pipe(plugins.babel({presets:['@babel/preset-env']})) // 设置 preset-env 完成es6+所以新特性
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

const page = () => {
    return src('src/*.html', {base:'src'})
        .pipe(plugins.swig({data, defaults: { cache: false }}))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

const image = () => {
    return src('src/assets/images/**', {base:'src'})
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const font = () => {
    return src('src/assets/fonts/**', {base:'src'})
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const extra = () => {
    return src('public/**', {base:'public'})
        .pipe(dest('dist'))
}

const server = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    // watch('src/assets/images/**', image)
    // watch('src/assets/fonts/**', font)
    // watch('public/**', extra)
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'src/*.html'
    ],bs.reload)
    bs.init({
        notify:false,
        port:2000,
        //open:false 
        //files:'dist/**',
        server:{
            baseDir:['temp', 'src', 'public'],
            routes:{
                '/node_modules': 'node_modules'
            }
        }
    })
}

const useref = () => {
    return src('temp/*.html', {base:'temp'})
        .pipe(plugins.useref({searchPath: ['temp', '.']}))
        //html js css
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/,plugins.htmlmin({
            collapseWhitespace: true, //折叠空白字符
            minifyCSS: true, // style标签内的css压缩
            minifyJS:true //压缩html中的js
        })))
        .pipe(dest('dist'))
}

const lint = () => {
     return src(['src/assets/script/*.js'])
     .pipe(plugins.eslint({
		rules: {
			'my-custom-rule': 1,
            'strict': 2,
            "camelcase": 1,
            "comma-dangle": 2,
            "quotes": 0
		},
		globals: [
			'jQuery',
			'$'
		],
		envs: [
			'browser'
		]
    }))
    .pipe(plugins.eslint.result(result => {
        console.log(`ESlint result: ${result.filePath}`)
    }))
	.pipe(plugins.eslint.formatEach('compact', process.stderr));
}



const deploy = () => {
    return src('dist/**/*')
    .pipe(plugins.ghPages([{
        remoteUrl:'https://github.com/huoshanshan/hss-pages',
        branch:'master',
        message:'消息'
    }]))
}

const compile = parallel(style, script, page)

const build = series(clean,parallel(series(compile, useref), extra, image, font))

const start = series(compile, server)

module.exports = {
    build,
    clean,
    server,
    start,
    lint,
    deploy
}