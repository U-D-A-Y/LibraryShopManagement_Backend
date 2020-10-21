const router = require('express').Router();
const database = require('../databaseConfi')
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

router.get('/sales/count',(req,res)=>{
    (async ()=>{
        const query=`select count("SALE_PK") as count from sales`;
        const [rows] = await database.connection.query(query)
        res.json(rows)
    })()
})


module.exports = router;