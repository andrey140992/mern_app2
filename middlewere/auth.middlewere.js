const jwt = require('jsonwebtoken')
const config = require('config')


module.exports =  (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }
    try {
        
        const token = req.headers.autorization.split(' ')[1]
        
        if(!token){
           return res.status(401).json({message: 'Нет авторизации 1'})
        }
       
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        
        req.user = decoded
        console.log(req.user)
        next()

    } catch (e) {
        res.status(401).json({message: 'Нет авторизации 2'})
    }
}