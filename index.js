const express = require('express');
const app = express();
const database = require('./databaseConfi')
const dashBoardApi = require('./api/libraryApi')
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/api', dashBoardApi)
app.post('/login', (req, res) => {
    let data = req.body.data;
    let query = `select * from users where name='${data.userName}' and password='${data.password}' limit 1`
    database.connection.query(query, (err, results, field) => {
        res.json(results)
    })

})

app.listen(3000, () => {
    database.connectDataBase();
})