const jwt = require('jsonwebtoken');
const process = require('./../../nodemon.json')

module.exports = (req, res, next) => {
    console.log('middleware called');
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decode = jwt.decode(token, process.env.JWT_KEY) 
        req.userData = decode;
        next()
        // if(decode){
        // }else{
        //     return res.status(400).json({
        //         message: 'Auth Failed. Token Required'
        //     })
        // }
    }
    catch(e){
        console.log(e)
        return res.status(400).json({
            message: 'Auth Failed'
        })
    }
};