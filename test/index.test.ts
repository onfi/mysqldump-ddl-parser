import Index from '../src/index';
import fs from 'fs';

describe('test index.ts', () => {
  it('load ddl', () => {
    const sql = fs.readFileSync('test/dump.sql', 'utf-8').toString();
    const tables = Index(sql);
    expect(54).toBe(Object.keys(tables).length);

    const userPreferences = tables.user_preferences;
    expect('user_preferences').toBe(userPreferences.name);

    expect(5).toBe(userPreferences.columns.length);
    expect('id').toBe(userPreferences.columns[0].name);
    expect('user_id').toBe(userPreferences.columns[1].name);
    expect('others').toBe(userPreferences.columns[2].name);
    expect('hide_mail').toBe(userPreferences.columns[3].name);
    expect('time_zone').toBe(userPreferences.columns[4].name);

    expect('id').toBe(userPreferences.primaryKey[0]);

    expect(1).toBe(userPreferences.keys.length);
    expect('user_id').toBe(userPreferences.keys[0][0]);

    expect(1).toBe(userPreferences.foreignKeys.length);
    const foreignKey = userPreferences.foreignKeys[0];
    expect('user_id').toBe(foreignKey.foreignKey);
    expect('users').toBe(foreignKey.referenceTable);
    expect('id').toBe(foreignKey.referenceColumn);
  });
});
