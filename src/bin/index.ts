import DDLParser from '../index';
process.stdin.once('data', (data) =>
  console.log(DDLParser(data.toString()).sql)
);
