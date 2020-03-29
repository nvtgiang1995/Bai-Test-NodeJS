const { GoogleSpreadsheet } = require('google-spreadsheet');
const _ = require('lodash');
const cron = require('node-cron');

const models = require('./models/index');
const doc = new GoogleSpreadsheet('1Bctt9oF60A_blzEm58V12o5owyi5UJflQt89xRp-YvE');
const creds = require('./Google-Sheets-37965d6b6d98.json');

const tableName = 'Accounts';

const server = (module.exports = {
    cronJob: null,
    scheduledJob: function (pattern) {
        server.cronJob = cron.schedule(pattern, () => {
            server.run();
        });
    },
    run: async () => {

        console.log('run called');

        await doc.useServiceAccountAuth(creds); // connect google sheets
        await doc.loadInfo(); //loads document properties and worksheets

        const sheet = doc.sheetsByIndex[0]; // load sheets index
        const rows = await sheet.getRows(); // get all rows

        let tmpArr = [], rowUp = [], arrayData = [], rowDe = [];

        for (let key in models[tableName].rawAttributes) { // get property model of table
            for (let index in rows) {

                if (rowDe.filter(item => rows[index].ColumnName == item).length == 0)
                    rowDe.push(rows[index].ColumnName);

                // update rows
                if (key === rows[index].ColumnName) {
                    rowUp.push(key);
                    rows[index].ObjectType = 'USER_TABLE';
                    rows[index].ObjectName = 'dbo.' + tableName;
                    rows[index].ColumnName = key;
                    rows[index].DataType = models[tableName].rawAttributes[key].type.toSql();
                    rows[index].Nullable = models[tableName].rawAttributes[key].allowNull ? 'NULL' : 'NOT NULL';
                    rows[index].MiscInfo = key === 'id' && models[tableName].rawAttributes[key].autoIncrement
                        ? 'identity(1,1)=31184' : '';

                    await rows[index].save();

                } else if (tmpArr.filter(item => key == item).length == 0) { // add data
                    tmpArr.push(key);
                    arrayData.push({
                        ObjectType: 'USER_TABLE',
                        ObjectName: 'dbo.' + tableName,
                        ColumnName: key,
                        DataType: models[tableName].rawAttributes[key].type.toSql(),
                        Nullable: models[tableName].rawAttributes[key].allowNull ? 'NULL' : 'NOT NULL',
                        MiscInfo: key === 'id' && models[tableName].rawAttributes[key].autoIncrement
                            ? 'identity(1,1)=31184' : ''
                    });

                }
            }
        }

        if (rowDe.length > 0) { // delete rows
            rowDe = _.difference(rowDe, tmpArr);
            for (let index in rows) {
                if (_.includes(rowDe, rows[index].ColumnName)) {
                    await rows[index].delete();
                }
            }
        }

        if (rowUp.length > 0) {
            tmpArr = _.difference(tmpArr, rowUp);
            if (tmpArr.length > 0) {
                arrayData = arrayData.map(item => {
                    if (tmpArr.filter(row => row == item.ColumnName).length > 0)
                        return item;
                });

                if (arrayData.length > 0)
                    await sheet.addRows(_.compact(arrayData)); // insert rows
            }
        }
    }
});