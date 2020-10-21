const router=require('express').Router();
const authService=require('../service/auth')


const category=require('./category')
const login=require('./login')
const book=require('./book')
const publisher=require('./publisher')
const sale=require('./sale')
const saleDatail=require('./sale-datail')
const customer=require('./customer')



function auth (req,res,next){
    try {
        authService.decodedToken(req.headers.authorization.split(" ")[1])
        next();
    } catch (error) {
        res.status(401).send('Unauthrized')
    }
   
   
}


router.use('/',login)
router.use('/',auth,category)
router.use('/',auth,book)
router.use('/',auth,publisher)
router.use('/',auth,sale)
router.use('/',auth,saleDatail)
router.use('/',auth,customer)

module.exports=router;