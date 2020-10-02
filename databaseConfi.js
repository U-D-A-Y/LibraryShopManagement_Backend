const mysql=require('mysql')
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

module.exports.connectDataBase = () => {
    this.connection.connect((err) => {
        if (err) throw err;
        console.log('Database is connected as id ' + this.connection.threadId)
    })
}
