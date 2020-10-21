const router = require('express').Router();
const database = require('../databaseConfi')

router.get('/sales-details/:start/:end',(req,res)=>{
    (async ()=>{
        try {
        let query=`select  
        s.SALE_PK as TRN_NO,
        c.NAME as CUSTOMER_NAME,
        Date(s.SALE_TIME) as DATE,
        s.COMMISSION,
        sum(b.PRICE*sd.QUENTITY) as TOTAL,
        sum(b.PRICE*sd.QUENTITY)-sum(b.PRICE*sd.QUENTITY)*(s.COMMISSION/100) as NET_TOTAL
        from  sales as s 
        join sale_details as sd on s.SALE_PK=sd.SALE_FK  
        join books as b on sd.BOOK_FK=b.BOOK_PK   
        join customers as c on s.CUSTOMER_FK=c.CUSTOMER_PK
        where SALE_TIME between ? and ? group by s.SALE_PK order by s.SALE_PK;`;
            let [rows]=await database.connection.query(query,[req.params.start,req.params.end])
            res.json(rows)
        } catch (error) {
            res.json(error)
        }
    })()
})



module.exports = router;