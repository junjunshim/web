const oracledb = require('oracledb');

async function getConnection(){
    let connection;
    try{
        connection = await oracledb.getConnection({
            user:'user106',
            password:'pass',
            connectionString:'172.18.7.180:1521/xe'
        });
        console.log('oracle DB 연결성공');
        return connection;
    }catch(err){
        console.log('oracle DB 연결 오류:', err);
    }
}  

module.exports = {getConnection};