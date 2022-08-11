const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    title: {
        type: String
    },
    data: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List'
        }
    ]
})

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
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }
})


let Board = mongoose.model('Board', boardSchema)
let List = mongoose.model('List', listSchema)
let Card = mongoose.model('Card', cardSchema)

module.exports = { List, Card, Board }