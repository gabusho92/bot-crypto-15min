const express = require('express')
const app = express();

const {firestore} = require('./proyect/firebase')

const port = process.env.PORT || 8080


require('./ws')




app.get('/', (req, res) => {
   res.send('hola')
})

app.listen(port, () => {
    console.log('Server on in port', port)
})