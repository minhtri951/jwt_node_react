const port = 3000
const { log } = console
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const { verifyToken } = require('./middleware')
const { posts } = require('./data')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/post', verifyToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.username))
})

app.listen(port, () => {
    log('App listening at ' + port)
})
