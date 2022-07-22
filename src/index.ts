import Table from './table'
const DDLParser = (ddl: string): Table => {
	return new Table(ddl);
};

export default DDLParser;