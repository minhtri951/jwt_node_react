const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader === undefined)
        return res.sendStatus(401)

    const token = bearerHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

module.exports = {
    verifyToken
}