const router = require('express').Router();
const database = require('../databaseConfi')

// Categories Api

router.get('/categories', (req, res) => {
    let query = "select * from categorys";
    (async () => {
        try {
            const [rows] = await database.connection.query(query)
            res.json(rows)
        } catch (error) {

        }
    })()

})

router.post('/category', (req, res) => {
    let query = `INSERT INTO categorys (NAME,DESCRIPTION) values("${req.body.NAME}","${req.body.DESCRIPTION}");`;
    (async () => {
        try {
            const result = await database.connection.query(query)
            res.json(result[0]);
        } catch (error) {

        }
    })()

})

router.delete('/category/:id', (req, res) => {
    let query = `DELETE FROM categorys where CATEGORY_PK=?`;
    (async () => {
        try {
            const result = await database.connection.query(query, [req.params.id])
            res.json(result)
        } catch (error) {

        }
    })()
})

router.patch('/category', (req, res) => {
    let query = `UPDATE categorys SET NAME=?,DESCRIPTION=? where CATEGORY_PK=?;`;
    (async () => {
        try {
            const result = await database.connection.query(query, [req.body.NAME,req.body.DESCRIPTION, req.body.CATEGORY_PK])
            res.json(result[0])
        } catch (error) {

        }
    })()
})

router.get('/categories/count',(req,res)=>{
    (async ()=>{
        const query=`select count("CATEGORY_PK") as count from categorys`;
        const [rows] = await database.connection.query(query)
        res.json(rows)
    })()
})

module.exports=router;