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




//books API

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
    `
    console.log(query)
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
    console.log(query)
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



// customer

router.get('/customers', async (req, res) => {
    let query = `select * from customers`
    const [rows] = await database.connection.query(query)
    res.json(rows)

})



// sales 
router.post('/transaction', async (req, res) => {
    try {
        await database.connection.beginTransaction();
        let query = `INSERT IGNORE  INTO customers (name,phone,customer_type,mail,address) values ("${req.body.customer.NAME}","${req.body.customer.PHONE}",1,"${req.body.customer.MAIL}","${req.body.customer.ADDRESS}") ;`
        let result = await database.connection.execute(query);

        query = `select customer_pk as CUSTOMER_FK  from  customers where phone="${req.body.customer.PHONE}";`
        result = await database.connection.execute(query);

        query = `insert into sales (CUSTOMER_FK,SALE_TIME,COMMISSION) values(${result[0][0].CUSTOMER_FK},CURDATE(),${req.body.commission});`
        result = await database.connection.execute(query);

        query = `SELECT LAST_INSERT_ID() as SALE_FK;`
        result = await database.connection.execute(query);

        let value = ""
        for (let index = 0; index < req.body.products.length; index++) {
            if (index == req.body.products.length - 1) {
                value += `(${result[0][0].SALE_FK},${req.body.products[index].BOOK_PK},${req.body.products[index].QUANTITY})`
            } else {
                value += `(${result[0][0].SALE_FK},${req.body.products[index].BOOK_PK},${req.body.products[index].QUANTITY}),`
            }

        }

        query = `insert into sale_details (SALE_FK,BOOK_FK,QUENTITY) values ${value};`
        result = await database.connection.execute(query);
        req.body.products.forEach(async item => {
            query = `update books set QUANTITY=QUANTITY-${item.QUANTITY} where BOOK_PK=${item.BOOK_PK};`
            result = await database.connection.execute(query);
        });

        await database.connection.commit();
        res.json(result[0])

    } catch (error) {
        if (error) {
            await database.connection.rollback();
            res.json(error)
        }
    }


})


module.exports = router;