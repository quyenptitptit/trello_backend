const reactDom = require('react-dom')
const { Card, List } = require('../model/model')

const cardController = {
    addCard: async (req, res) => {
        try {
            const newCard = new Card(req.body)
            const savedCard = await newCard.save()
            if (req.body.list) {
                const list = List.findById(req.body.list)
                await list.updateOne({ $push: { card: savedCard } })
            }
            res.status(200).json(savedCard)
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    getCard: async (req, res) => {
        try {
            const cards = await Card.find()
            res.status(200).json(cards)
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    updateCard: async (req, res) => {
        try {
            const card = await Card.findById(req.params.id)
            await card.updateOne({ $set: req.body })
            res.status(200).json("Updated successfully!")
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    updateIdxCard: async (req, res) => {
        try {
            const card = await Card.findById(req.params.id)
            await card.updateOne({$set: {card: req.body}})
            if (req.body.list) {
                const list = await List.findById(req.body.list)
                await list.updateOne({ $push: { card: card } })
                await List.deleteOne(
                    {}
                )
            }
            res.status(200).json(card)
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    deleteCard: async (req, res) => {
        try {
            await List.updateMany(
                { card: req.params.id },
                { $pull: { card: req.params.id } })
            await Card.findByIdAndDelete(req.params.id)
            res.status(200).json('Delete successfully!')
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = cardController