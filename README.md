# mysqldump DDL parser

Parse DDL, output JS object.

## Usage

```
// `mysqldump.sql` is mysqldump generated SQL.
const sql = fs.readFileSync('mysqldump.sql', 'utf-8').toString();

const parsedObj = MysqldumpDdlParser(sql);

console.log(parsedObj.your_table_name);
```
