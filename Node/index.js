const express = require('express')
const jwt = require('jsonwebtoken')
const { verifyToken } = require('./middleware')
const app = express()
const port = 3000
const { log } = console


app.get('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'tri',
        email: 'tri@gmail.com'
    }
    jwt.sign({ user }, "secret", { expiresIn: 20 }, (err, token) => {
        res.json({ token })
    })

})

app.get('/api/protected', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, decodedPayload) => {
        if (err) {
            res.sendStatus(403)

        } else {
            res.json({
                message: 'ok',
                decodedPayload
            })
        }
    })
})




app.listen(port, () => {
    log('App listening at ' + port)
})
