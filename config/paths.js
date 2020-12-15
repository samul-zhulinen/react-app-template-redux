const fs = require('fs');
const path = require('path');

// 当前app文件夹的标准化路径
const appDirectory = fs.realpathSync(process.cwd());
// 获取传入地址的路径，path.resolve的效果相当于不断的进行cd操作，最后返回一个路径
// resolveApp作为一个共用方法，获取当前app下的资源路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];
module.exports = {
  appSrc: resolveApp('src'),
  appHtml: resolveApp('public/index.html'),
  appTsConfig: resolveApp('tsconfig.json'),
  appBuild: resolveApp('build'),
  appPackageJson: resolveApp('package.json'),
  appNodeModules: resolveApp('node_modules'),
};
module.exports.moduleFileExtensions = moduleFileExtensions;
