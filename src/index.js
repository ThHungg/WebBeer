const express = require('express')
const dotenv = require('dotenv')
const routes = require('./routes')
const { default: mongoose } = require('mongoose')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

routes(app)

mongoose.connect(`${process.env.MONGO_DB}`).then(() => {
    console.log("Connect Db success!")
}).catch((err) => {
    console.log(err)
})

app.listen(3000, () => {
    console.log('Server is running on port ', port)
})
