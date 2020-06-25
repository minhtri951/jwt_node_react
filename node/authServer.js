const port = 4000
const { log } = console
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const { verifyToken } = require('./middleware')
const { posts } = require('./data')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

let refreshTokens = []

app.get('/login', (req, res) => {
    // Authentication user
    const { username } = req.body
    const user = { username }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    refreshTokens.push(refreshToken)
    res.json({ accessToken, refreshToken })
})

app.get('/token', (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ username: user.username })
        res.json({ accessToken })
    })

})

app.get('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(t => t !== req.body.token)
    res.sendStatus(204)
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })

}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

}






app.listen(port, () => {
    log('App listening at ' + port)
})
