const express = require('express')
const app = express()
const port = 3000
const { log } = console


app.get('/', (req, res) => {
    res.send('Hello!')
})



app.listen(port, () => {
    log('App listening at ' + port)
})
