module.exports = {
  entry: `./dist/index.js`,
  output: {
    path: `${__dirname}/dist/`,
    filename: `mysql-ddl-parser.min.js`,
    library: 'MysqlDdlParser',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
};
