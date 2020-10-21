const router = require('express').Router();
const database = require('../databaseConfi')

//Publisher API
router.get('/publishers', (req, res) => {
    let query = `select * from publishers`;
    (async () => {
        try {
            const [rows] = await database.connection.query(query)
            res.json(rows)
        } catch (error) {

        }
    })()
})

router.post('/publisher', (req, res) => {
    let query = `INSERT INTO publishers (NAME,PHONE,ADDRESS,DESCRIPTION) values(?,?,?,?);`;
    (async () => {
        try {
            const result = await database.connection.query(query,[req.body.NAME,req.body.PHONE,req.body.ADDRESS,req.body.DESCRIPTION]);
            res.json(result[0]);
        } catch (error) {

        }
    })()

})

router.delete('/publisher/:id', (req, res) => {
    let query = `DELETE FROM publishers where PUBLISHER_PK=?`;
    (async () => {
        try {
            const result = await database.connection.query(query, [req.params.id])
            res.json(result)
        } catch (error) {

        }
    })()
})

router.patch('/publisher', (req, res) => {
    let query = `UPDATE publishers SET NAME=?,PHONE=?,ADDRESS=?,DESCRIPTION=? where PUBLISHER_PK=?;`;
    (async () => {
        try {
            const result = await database.connection.query(query, [req.body.NAME,req.body.PHONE,req.body.ADDRESS,req.body.DESCRIPTION, req.body.PUBLISHER_PK])
            res.json(result[0])
        } catch (error) {

        }
    })()
})

module.exports=router;