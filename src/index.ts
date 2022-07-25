import Table from './Table';
const MysqldumpDdlParser = (
  ddl: string,
  dialect?: string
): { [s: string]: Table } => {
  const sentences: string[] = ddl.split(/;/).map((sentence) => sentence.trim());
  const tables: { [s: string]: Table } = {};
  sentences
    .filter((sentence) => sentence.startsWith('CREATE TABLE'))
    .forEach((sentence) => {
      const table = new Table(sentence, dialect ?? 'mysql');
      tables[table.name] = table;
    });
  return tables;
};

export default MysqldumpDdlParser;
