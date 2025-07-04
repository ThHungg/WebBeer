const express = require('express')
const dotenv = require('dotenv')
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// app.use(cors())
app.use(
    cors({
        origin: 'http://localhost:5173', // FE domain
        credentials: true
    })
);

app.use(bodyParser.json())
app.use(cookieParser());
app.use('/uploads', express.static('public/uploads'));

routes(app)

mongoose.connect(`${process.env.MONGO_DB}`).then(() => {
    console.log("Connect Db success!")
}).catch((err) => {
    console.log(err)
})

app.listen(port, () => {
    console.log('Server is running on port ', port)
})
