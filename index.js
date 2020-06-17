const express = require('express')
const app = express()
const port = 3000
const { log } = console


app.get('/login', (req, res) => {
    res.set({
        'Set-Cookie': 'session=oRlkVLOkCBNrMilaSWnTcWtCfJC; path=/;',
    })
    res.redirect('/user')
})

app.get('/user', (req, res) => {
    res.send('Logged! Hello user!')
    console.log(req.headers['cookie'])
})


app.get('/logout', (req, res) => {
    res.set({
        'Set-Cookie': 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    })
    res.send('Loggouted!')
})


app.listen(port, () => {
    log('App listening at ' + port)
})
