const mysql=require('mysql2/promise')
const config={
    host:'localhost',
    user:'root',
    password:'1234',
    database:"LibraryManagementDb",
    port:3306
}


module.exports.connection = mysql.createConnection(config);

module.exports.getConnection = () => {
    return this.connection;
}

module.exports.connectDataBase = async () => {
    this.connection = await mysql.createConnection(config);
}
