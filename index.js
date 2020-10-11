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
    let query = `select * from users where name=? and password=? limit 1`;
    (async()=>{
        try {
            const[rows]=await database.connection.query(query,[data.userName,data.password])
            res.json(rows)
        } catch (error) {
            
        }
    })()
  

})

app.listen(3000, () => {
    database.connectDataBase();
})