const express = require('express');
const app = express();
const database = require('./databaseConfi')
const dashBoardApi = require('./api/libraryApi')
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/api', dashBoardApi)


app.listen(3000, () => {
    database.connectDataBase();
})