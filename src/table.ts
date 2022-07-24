import Column from './Column';
import ForeignKey from './ForeignKey';
export default class Table {
  sql: string;
  name = '';
  columns: Column[] = [];
  primaryKey: string[] = [];
  keys: string[][] = [];
  foreignKeys: ForeignKey[] = [];

  constructor(sql: string) {
    this.sql = sql;
    sql.split(/\r?\n/).forEach((line) => {
      line = line.trim();
      if (/CREATE TABLE/.test(line)) {
        this.name = (line.match(/`([^`]+)`/)?.at(1) ?? '').toLowerCase();
      } else if (/^`/.test(line)) {
        this.columns.push(new Column(line));
      } else if (/ FOREIGN KEY /.test(line)) {
        this.foreignKeys.push(new ForeignKey(line));
      } else if (/^PRIMARY KEY/.test(line)) {
        const parsed = line.match(/\((.*)\)/);
        if (parsed?.at(1)) {
          this.primaryKey =
            parsed
              ?.at(1)
              ?.split(/,/)
              .map((key) => key.replaceAll('`', '')) ?? this.primaryKey;
        }
      } else if (/^KEY/.test(line)) {
        const parsed = line.match(/\((.*)\)/);
        if (parsed?.at(1)) {
          const key = parsed
            ?.at(1)
            ?.split(/,/)
            .map((key) => key.replaceAll('`', '').toLowerCase());
          if (key) {
            this.keys.push(key);
          }
        }
      }
    });
  }
}
