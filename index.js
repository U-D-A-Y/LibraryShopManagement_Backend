const express = require('express');
const app = express();
const database = require('./databaseConfi')
const api = require('./api/api')

const cors = require('cors');
const path = require('path');

port =process.env.PORT || 3000
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


app.use('/api',api)


// app.use(express.static(`${__dirname}/dist/LabraryManagemen`));
// app.get('/*', (req, res, next) => {
//     const indexPath = path.join(__dirname, 'dist/LabraryManagemen/index.html');
//     res.sendFile(indexPath);
// });

app.listen(port, () => {
    database.connectDataBase();
})