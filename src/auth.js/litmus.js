const userModel = require('../model/litmus.js')
const vfy = require('../validation/litmus.js')
const jwt = require('jsonwebtoken')
const authentication = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (vfy.isEmptyVar(token)) return res.status(400).send({ status: false, Message: "⚠️ The token must be required in 'Bearer'" })
        // console.log(token)

        token = token.split(' ')[1] // get the 1 index value
        jwt.verify(token, 'secret', function (err, decode) {
            if (err) {
                return res.status(401).send({ status: false, Message: err.message })
            } else {
                // console.log(decode)
                req.tokenData = decode;
                next()
            }
        })
    } catch (_) {
        res.status(500).send({ status: false, Message: _.message })
    }
}


const authorization_user = async (req, res, next) => {
 
    const userId = req.query.userId
    
    // 👉 get user id from token
    const token = req.tokenData

    // 👉 check valid object id
    if (!vfy.isValidObjectId(userId)) return res.status(400).send({ status: false, Message: "Invalid user ID!" })

    // check the user exist in db
    const user = await userModel.findOne({_id:userId})
    if (!user) return res.status(404).send({ status: false, Message: "⚠️ No user found!" })

    // auth Z 🔐
    if (userId !== token.userId) return res.status(401).send({ status: false, Message: "🔒 Unauthorized user!" })

    next()
}


module.exports = {
    authentication,
    authorization_user
}