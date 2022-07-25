export default class Column {
  sql: string;
  name = '';
  type = '';
  notNull = false;
  autoIncrement = false;
  default: string | null = null;

  constructor(sql: string, dialect: string) {
    this.sql = sql;
    if(dialect == 'oracle') {
      this.oracle(sql);
    } else {
      this.mysql(sql);
    }
  }
  oracle(sql: string) {
    let parsed = sql.match(/"([^"]+)" ([^ ]+)/);
    this.name = (parsed?.at(1) ?? '').toLowerCase();
    this.type = parsed?.at(2) ?? '';
    if (/NOT NULL/.test(sql)) {
      this.notNull = true;
    }
    // TODO fuzzy
    parsed = sql.match(/ DEFAULT ([^ ]*),?/);
    if (parsed) {
      this.default = parsed.at(1) ?? '';
    }
  }

  mysql(sql: string) {
    let parsed = sql.match(/`([^`]+)` ([^ ]+)/);
    this.name = (parsed?.at(1) ?? '').toLowerCase();
    this.type = parsed?.at(2) ?? '';
    if (/NOT NULL/.test(sql)) {
      this.notNull = true;
    }
    if (/AUTO_INCREMENT/.test(sql)) {
      this.autoIncrement = true;
    }
    parsed = sql.match(/ DEFAULT (.*),?/);
    if (parsed) {
      this.default = parsed.at(1) ?? '';
    }
  }
}
