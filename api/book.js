const router = require('express').Router();
const database = require('../databaseConfi')

router.get('/books', async (req, res) => {
    let query = `select 
    b.BOOK_PK,b.name as BOOK_NAME,
    b.ISBN,b.CATEGORY_FK,
    c.name as CATEGORY_NAME,b.AUTHOR_NAME,b.PUBLICATION_BY_FK,p.name as PUBLICATION_NAME,
    b.PUBLICATION_YEAR,b.NUMBER_OF_PAGE,b.PRICE,b.QUANTITY
    from books as b 
    join categorys as c 
    on b.CATEGORY_FK=c.CATEGORY_PK 
    join publishers as p 
    on b.publication_by_fk=p.publisher_pk;`
    const [rows] = await database.connection.query(query)
    res.json(rows)

})

router.post('/book', (req, res) => {

    let query = `INSERT INTO books (NAME,ISBN,CATEGORY_FK,AUTHOR_NAME,PUBLICATION_BY_FK,PUBLICATION_YEAR,NUMBER_OF_PAGE,PRICE,QUANTITY,DESCRIPTION)values("${req.body.BOOK_NAME}","${req.body.ISBN}",${req.body.CATEGORY_FK},"${req.body.AUTHOR_NAME}",${req.body.PUBLICATION_BY_FK}, ${req.body.PUBLICATION_YEAR}, ${req.body.NUMBER_OF_PAGE},${req.body.PRICE}, ${req.body.QUANTITY}, "${req.body.DESCRIPTION}");
    `;
    database.connection.query(query, (err, result, field) => {
        if (result) {
            res.json(result)
        }
        if (err)
            res.json(err)

    })



})

router.delete('/book/:id', (req, res) => {

    let query = `DELETE FROM books where BOOK_PK=${req.params.id}`
    database.connection.query(query, (err, result, field) => {
        if (result) {
            res.json(result)
        }
        if (err)
            res.json(err)

    })

})

router.patch('/book', (req, res) => {
    let query = `UPDATE books SET NAME=?,ISBN=?,CATEGORY_FK=?,AUTHOR_NAME=?,PUBLICATION_BY_FK=?,PUBLICATION_YEAR=?,NUMBER_OF_PAGE=?,PRICE=?,QUANTITY=?,DESCRIPTION=? where BOOK_PK=?;`;
    (async () => {
        try {
            const result = await database.connection.query(query, [req.body.BOOK_NAME, req.body.ISBN, req.body.CATEGORY_FK, req.body.AUTHOR_NAME, req.body.PUBLICATION_BY_FK, req.body.PUBLICATION_YEAR, req.body.NUMBER_OF_PAGE, req.body.PRICE, req.body.QUANTITY, req.body.DESCRIPTION, req.body.BOOK_PK])
            res.json(result[0])
        } catch (error) {

        }
    })()
})

router.get('/books/count',(req,res)=>{
    (async ()=>{
        const query=`select count("BOOK_PK") as count from books`;
        const [rows] = await database.connection.query(query)
        res.json(rows)
    })()
})

module.exports=router;