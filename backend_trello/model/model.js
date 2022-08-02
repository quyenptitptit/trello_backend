const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    card: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card'
        }
    ]
})

const cardSchema = new mongoose.Schema({
    nameCard: {
        type: String,
        required: true
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }
})

let List = mongoose.model('List', listSchema)
let Card = mongoose.model('Card', cardSchema)

module.exports = { List, Card }