const router=require('express').Router();
const database=require('../databaseConfi');
const authService=require('../service/auth')

router.post('/login', (req, res) => {
    let data = req.body.data;
    let query = `select * from users where name=? and password=? limit 1`;
    (async()=>{
        try {
            const[rows]=await database.connection.query(query,[data.userName,data.password])
            if(rows.length>0){
                let payload={
                    id:rows[0].USER_ID,
                    name:rows[0].NAME,
                }
                let token=authService.getToken(payload)
                res.json({token:token,authentic:true})
            }else{
                res.json({token:'',authentic:false})
            }
            
        } catch (error) {
            
        }
    })()
  

})

module.exports=router;