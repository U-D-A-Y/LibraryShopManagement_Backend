var jwt = require('jsonwebtoken');
let secretKey="secret";

module.exports.getToken=(payload)=>{
    try {
        let token= jwt.sign(payload, secretKey);
        return token
    } catch (error) {
    }
   
   
    
}

module.exports.decodedToken=token=>{
    return jwt.verify(token,secretKey);
}


