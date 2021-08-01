const express = require('express')
const app = express();
const port = process.env.PORT || 8080


require('./ws')

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, () => {
    console.log('Server on in port', port)
})