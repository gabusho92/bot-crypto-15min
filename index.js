const express = require('express')
const app = express();
const port = process.env.PORT || 8080


require('./ws')

app.get('/', (res, req) => {
    res.send('hello')
})

app.listen(port, () => {
    console.log('Server on in port', port)
})