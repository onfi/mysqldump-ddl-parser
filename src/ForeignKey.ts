export default class ForeignKey {
  sql: string;
  name = '';
  foreignKey = '';
  referenceTable = '';
  referenceColumn = '';

  constructor(sql: string, dialect: string) {
    this.sql = sql;
    if (dialect == 'oracle') {
      this.oracle(sql);
    } else {
      this.mysql(sql);
    }
  }

  oracle(sql: string) {
    const parserd = sql.match(
      /CONSTRAINT "([^"]*)" +FOREIGN KEY +\("([^"]*)"\)[ \r\n]+REFERENCES ([^\(]+)\("([^"]*)"\)/
    );
    this.name = (parserd?.at(1) ?? '').toLocaleLowerCase();
    this.foreignKey = (parserd?.at(2) ?? '').toLocaleLowerCase();
    const referenceTable = (parserd?.at(3) ?? '').split(/\./);
    this.referenceTable = referenceTable[referenceTable.length - 1]
      .trim()
      .replaceAll(/"/g, '')
      .toLocaleLowerCase();
    this.referenceColumn = (parserd?.at(4) ?? '')
      .trim()
      .replaceAll(/"/g, '')
      .toLocaleLowerCase();
  }

  mysql(sql: string) {
    const parserd = sql.match(
      /CONSTRAINT `([^`]*)` FOREIGN KEY \(`([^`]*)`\) REFERENCES `([^`]*)` \(`([^`]*)`\)/
    );
    this.name = (parserd?.at(1) ?? '').toLocaleLowerCase();
    this.foreignKey = (parserd?.at(2) ?? '').toLocaleLowerCase();
    this.referenceTable = (parserd?.at(3) ?? '').toLocaleLowerCase();
    this.referenceColumn = (parserd?.at(4) ?? '').toLocaleLowerCase();
  }
}
