const router = require('express').Router();
const database = require('../databaseConfi')


const getData = query => {
    return new Promise((resolve, reject) => {
        database.connection.query(query, (err, result, field) => {
           resolve(result);
        })
    })
}


// Categories Api

    router.get('/categories',(req,res)=>{
        let query="select * from categorys";
        getData(query)
        .then(result=>{
            res.json(result)
        })
    })





//books API

router.get('/books', (req, res) => {
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
    getData(query)
    .then(result=>{
            res.json(result)
    })

})

router.post('/book',(req,res)=>{
    
    let query=`INSERT INTO books (NAME,ISBN,CATEGORY_FK,AUTHOR_NAME,PUBLICATION_BY_FK,PUBLICATION_YEAR,NUMBER_OF_PAGE,PRICE,QUANTITY,DESCRIPTION)values("${req.body.BOOK_NAME}","${req.body.ISBN}",${req.body.CATEGORY_FK},"${req.body.AUTHOR_NAME}",${req.body.PUBLICATION_BY_FK}, ${req.body.PUBLICATION_YEAR}, ${req.body.NUMBER_OF_PAGE},${req.body.PRICE}, ${req.body.QUANTITY}, "${req.body.DESCRIPTION}");
    `
    console.log(query)
    database.connection.query(query, (err, result, field) => {
        if(result){
            res.json(result)
        }
        if(err)
            res.json(err)
     
     })
   
})
router.delete('/book/:id',(req,res)=>{
    
    let query=`DELETE FROM books where BOOK_PK=${req.params.id}`
    console.log(query)
    database.connection.query(query, (err, result, field) => {
        if(result){
            res.json(result)
        }
        if(err)
            res.json(err)
     
     })
   
})
//Publisher API
router.get('/publishers', (req, res) => {
    let query = `select * from publishers`
    getData(query)
    .then(result=>{
            res.json(result)
    })

})


module.exports = router;