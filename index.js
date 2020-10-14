const express = require('express');
const app = express();
const database = require('./databaseConfi')
const serviceApi = require('./api/libraryApi')
const authApi = require('./api/auth')
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/',authApi)
app.use('/api',serviceApi)



app.listen(3000, () => {
    database.connectDataBase();
})