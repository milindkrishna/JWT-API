// check username and password in login request
//if exists create new JWT
// send back to frontend
// setup aunthentication so only the req with JWT can access dashboard

const customError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
     if(!username || !password) {
        throw new customError('Please provide email and password', 400)
     }

     // for demo we create a id using date
     const id = new Date().getDate()
     // dont send password to signature and should be small size payload
     const token = jwt.sign({id,  username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
    // inside the local storage we have token
    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {
    // inside the network - we have authorization with bearer token value
    // console.log(req.headers.authorization)
    //console.log(req.user);
    
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello ${req.user.username}`, secret: `here is your authorized data, your lucky number is ${luckyNumber}` })

    

    
}

module.exports = { login, dashboard }