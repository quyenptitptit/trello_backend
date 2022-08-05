const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const app = express()

const listRouter = require('./routes/listRoute')
const cardRouter = require('./routes/cardRoute')
const boardRouter = require('./routes/boardRoute')

app.use(bodyParser.json({limit: '50mb'}))
app.use(cors())
app.use(morgan('common'))

dotenv.config()
mongoose.connect(('mongodb://localhost:27017/trello'), () => {
    console.log('Connected to MongoDB')
})

app.get('/api', (req, res) => {
    res.status(200).json('hello')
})

app.use('/api/list', listRouter)
app.use('/api/card', cardRouter)
app.use('/api/board', boardRouter)

app.listen(8000, () => {
    console.log('Port 8000 is running')
})