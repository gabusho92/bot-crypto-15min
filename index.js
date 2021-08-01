const express = require('express')
const app = express();
const port = 8080


require('./ws')



app.listen(port, () => {
    console.log('Server on in port', port)
})