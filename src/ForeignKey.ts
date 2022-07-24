export default class ForeignKey {
  sql: string;
  name: string;
  foreignKey: string;
  referenceTable: string;
  referenceColumn: string;

  constructor(sql: string) {
    this.sql = sql;
    const parserd = sql.match(
      /CONSTRAINT `([^`]*)` FOREIGN KEY \(`([^`]*)`\) REFERENCES `([^`]*)` \(`([^`]*)`\)/
    );
    this.name = (parserd?.at(1) ?? '').toLocaleLowerCase();
    this.foreignKey = (parserd?.at(2) ?? '').toLocaleLowerCase();
    this.referenceTable = (parserd?.at(3) ?? '').toLocaleLowerCase();
    this.referenceColumn = (parserd?.at(4) ?? '').toLocaleLowerCase();
  }
}
