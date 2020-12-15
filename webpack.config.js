const fs = require('fs');
const path = require('path');
const paths = require('./config/paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
// 是否开启线上sourceMap模式的打包
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// 是否支持TS 检查是否存在tsconfig.json
const useTypeScript = fs.existsSync(paths.appTsConfig);
const isEnvProductionProfile =
  isEnvProduction && process.argv.includes('--profile');
const appPackageJson = require(paths.appPackageJson);
const imageInlineSizeLimit = 1;

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }
  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

const config = {
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  // 入口文件
  entry: './src/index.js',
  output: {
    // 输出的文件夹
    path: isEnvProduction ? paths.appBuild : undefined,
    pathinfo: isEnvDevelopment,
    // 使用模板语法，每次打包生成不同的8位哈希值
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: isEnvDevelopment ? '/' : `/yuantu/h5-mf/${appPackageJson.name}`,
    // 优化路径显示
    devtoolModuleFilenameTemplate: isEnvProduction
      ? (info) =>
          path
            .relative(paths.appSrc, info.absoluteResourcePath)
            .replace(/\\/g, '/')
      : isEnvDevelopment &&
        ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    libraryTarget: 'umd',
    library: `${appPackageJson.name}`,
  },

  // 用于指定打包后是否使用sourceMap的模式
  // GENERATE_SOURCEMAP==='false'时将在生产环境中不以sourceMap模式打包(不会产生.map文件)
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',
  module: {
    rules: [
      {
        oneOf: [
          // url-loader可以识别各种图片，同时将会把小于limit的转为base64格式。使其加载更为快速
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: imageInlineSizeLimit,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            // 配置js 的 polyfill
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            use: {
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    {
                      // 根据查看是否引入了jsx-runtime这个运行时插件来决定是否启用jsx转换
                      runtime: hasJsxRuntime ? 'automatic' : 'classic',
                    },
                  ],
                ],
                plugins: [
                  // react-refresh是react官方支持的热更新插件，对HOOK有着优秀的支持 原理剖析https://cloud.tencent.com/developer/article/1645453
                  // 它拥有着比之前的HMR，React Hot Loader细粒度更细的热更新能力，支持组件级，甚至HOOK级别的可靠更新
                  // 暂时值支持React.DOM 16.9+,或者react-reconciler 0.21.0+
                  isEnvDevelopment && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
                // 这是babel在webpack中的一个功能，并不是babel本身自带的
                // 开启后，他将会缓存loader执行的结果。之后再次编译时会尝试使用缓存
                // 默认的地址时node_mudules/.cache/babel-loader
                cacheDirectory: true,
                // https://github.com/facebook/create-react-app/issues/6846
                cacheCompression: false,
                // 是否开启代码压缩
                compact: isEnvProduction,
              },
            },
          },
          // 打捞不在app内的js
          // @babelxxxruntime 这个运行时插件用于默认的为全局提供一些新api和新函数的polyfill实现，这里越过它做处理

          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              // 不会去走babelrc.js中的配置
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
              // https://github.com/facebook/create-react-app/issues/6846
              cacheCompression: false,

              // 开启sourceMap，如果需要debug或者是定位错误可以定位到node_modules中的位置
              sourceMaps: shouldUseSourceMap,
              inputSourceMap: shouldUseSourceMap,
            },
          },
          {
            test: /\.(less|css)$/,
            use: [
              isEnvDevelopment
                ? require.resolve('style-loader')
                : // 这是一个minicss提取插件，他会为每个包含css的js创建一个css文件
                  MiniCssExtractPlugin.loader,
              // 这里有个坑，style-loader和MiniCssExtractPlugin不能同时使用。
              // 会爆出export 'default' (imported as 'content') was not found in
              // 虽然是个warning但会导致项目样式表出错
              // 约定在开发环境中使用style-loader，在生产环境中使用MiniCssExtractPlugin
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    plugins: [
                      'postcss-flexbugs-fixes',
                      'autoprefixer',
                      [
                        'postcss-preset-env',
                        {
                          autoprefixer: {
                            flexbox: 'no-2009',
                          },
                          stage: 3,
                        },
                      ],
                    ],
                  },
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                },
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: { javascriptEnabled: true },
                },
              },
            ],
          },
          {
            // 其他文件类型的兜底loader，应当排除js，html，json，以确保不会被file-loader处理
            // 当你想要新增其他的loader时，应当考虑在file-loader前使用
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      // 更加优秀的压缩优化插件，原身是terser
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: isEnvProductionProfile,
          keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      // 默认使用的是cssnano的压缩，这也是为什么不在postcss中使用cssnano的原因
      // 尽量分离loader和optimization两个配置的指责
      // 提升本地编译的速度
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap
            ? {
                inline: false,
                annotation: true,
              }
            : false,
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
    // 开启chunk
    splitChunks: {
      chunks: 'all',
      name: '',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml,
        },
        isEnvProduction
          ? {
              //  开启压缩
              minify: {
                removeComments: true, //去除注释
                collapseWhitespace: true, //去除无效的空白格
                removeRedundantAttributes: true, //去除和默认值相等的属性只
                useShortDoctype: true, //使用格式为HTML5的doctype声明
                removeEmptyAttributes: true, // 去除空属性
                removeStyleLinkTypeAttributes: true, // 去除style和link标签的link属性
                keepClosingSlash: true, // 单例标签的的闭合斜线
                minifyJS: true, // 压缩html中的js，使用Terser
                minifyCSS: true, // 压缩html中的css，使用clean-css
                minifyURLs: true, //压缩各种属性中的URL，使用relatedurl
              },
            }
          : undefined,
      ),
    ),
    //  只在开发环境中开启HMR/babel-refresh
  ]
    .concat(
      isEnvDevelopment
        ? [
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin(),
          ]
        : [],
    )
    .concat(
      isEnvProduction
        ? [
            // 性能更优的css提取插件，合并后的css文件将会以link外链的形式插入html中
            new MiniCssExtractPlugin({
              filename: 'static/css/[name].[contenthash:8].css',
              chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
          ]
        : [],
    ),
  resolve: {
    // module 告知了webpack应该从哪里优先解析模块，如果使用默认的node_modules，他会由近及远的查找所有的node_modules文件夹
    // 在node_modules指定项目本身的依赖文件夹，以此期望每次获取的模块都是我们指定的
    // 暂时不支持从非node_modules中引用模块，例如：你希望在jsconfig/tsconfig中设置baseUrl，来指定非相关模块名称的基础目录
    // 如果需要的话，需要写一个module类，动态的获取其中的baseUrl配置，处理后拼接在modules中
    modules: ['node_modules', paths.appNodeModules],
    // 如果多个文件有相同的文字，但是后缀名不同，webpack将会按照顺序依次解析,此处类型是借鉴的列表。有一定的优先级顺序
    // 可以让我们在引入时不再带后缀
    extensions: paths.moduleFileExtensions
      .map((ext) => `.${ext}`)
      .filter((ext) => useTypeScript || !ext.includes('ts')),
    // pnp-webpack-plugin用于帮助node更快的解析模块
    // 原因是因为npm作为一个包管理器，它自己拥有模块的结构树，但是node是不知道的
    // pnp-webpack-plugin可以告知node 项目依赖模块的结构树，以此得到更快的性能
    // 此功能在webpack5后已经在内部支持

    // plugins: [
    //   PnpWebpackPlugin,
    // ],
    alias: {
      '@features': path.resolve(__dirname,'src/features'),
      '@store': path.resolve(__dirname,'src/store'),
      '@util': path.resolve(__dirname, 'src/_util'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@style': path.resolve(__dirname, 'src/pages/_style'),
    },
  },
  // resolveLoader: {
  //   plugins: [
  //     PnpWebpackPlugin.moduleLoader(module),
  //   ],
  // },
  devServer: {
    // 主机地址
    host: '127.0.0.1',
    // 开启gzip压缩
    compress: true,
    // 端口
    port: 9900,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: false,
  },
};

module.exports = config;
