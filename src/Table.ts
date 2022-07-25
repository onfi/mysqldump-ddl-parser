import Column from './Column';
import ForeignKey from './ForeignKey';
export default class Table {
  sql: string;
  name = '';
  columns: Column[] = [];
  primaryKey: string[] = [];
  keys: string[][] = [];
  foreignKeys: ForeignKey[] = [];

  constructor(sql: string, dialect: string) {
    this.sql = sql;
    if (dialect == 'oracle') {
      this.oracle(sql);
    } else {
      this.mysql(sql);
    }
  }

  oracle(sql: string) {
    sql
      .replace(/\r?\n[\t ]+REFERENCES/, ' REFERENCES')
      .split(/\r?\n/)
      .forEach((line) => {
        line = line.trim();
        if (/CREATE TABLE/.test(line)) {
          const parsed = line.match(/"([^]+)"/);
          if (parsed) {
            const splited = parsed[1].split(/\./);
            this.name = splited[splited.length - 1]
              .replaceAll(/"/g, '')
              .toLowerCase();
          }
        } else if (/^(\([\t ]*)?"/.test(line)) {
          this.columns.push(new Column(line, 'oracle'));
        } else if (/ FOREIGN KEY /.test(line)) {
          this.foreignKeys.push(new ForeignKey(line, 'oracle'));
        } else if (/PRIMARY KEY/.test(line)) {
          const parsed = line.match(/PRIMARY KEY.*\(([^)]*)\)/);
          if (parsed) {
            this.primaryKey = parsed[1]
              .split(/,/)
              .map((c) => c.trim().toLowerCase().replaceAll(/"/g, ''));
          }
        }
        // TODO INDEX
      });
  }

  mysql(sql: string) {
    sql.split(/\r?\n/).forEach((line) => {
      line = line.trim();
      if (/CREATE TABLE/.test(line)) {
        this.name = (line.match(/`([^`]+)`/)?.at(1) ?? '').toLowerCase();
      } else if (/^`/.test(line)) {
        this.columns.push(new Column(line, 'mysql'));
      } else if (/ FOREIGN KEY /.test(line)) {
        this.foreignKeys.push(new ForeignKey(line, 'mysql'));
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
