const customError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new customError('No token provided', 401)
    }

    const token = authHeader.split(' ')[1]  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded);
        const {id, username} = decoded
        req.user = {id, username}
        next()
        
    } catch (error) {
        throw new customError('Not authorized to access this route', 401)
    }
    
    
}

module.exports = authMiddleware