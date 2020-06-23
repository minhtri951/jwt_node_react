
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    log(bearerHeader)
    if (bearerHeader === undefined) {
        res.sendStatus(403)
    } else {
        const token = bearerHeader.split(' ')[1]
        req.token = token
        next()
    }
}

module.exports = {
    verifyToken
}