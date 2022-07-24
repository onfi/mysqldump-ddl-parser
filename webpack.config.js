module.exports = {
  entry: `./dist/index.js`,
  output: {
    path: `${__dirname}/dist/`,
    filename: `mysqldump-ddl-parser.min.js`,
    library: 'MysqldumpDdlParser',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
};
