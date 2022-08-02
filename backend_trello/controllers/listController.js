const { Card, List } = require('../model/model')

const listController = {
    addList: async (req, res) => {
        try {
            const nenwList = new List(req.body)
            const savedList = await nenwList.save()
            res.status(200).json(savedList)
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    getList: async (req, res) => {
        try {
            const lists = await List.find().populate('card')
            res.status(200).json(lists)
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    updateList: async (req, res) => {
        try {
            const list = await List.findById(req.params.id).populate('card')
            await list.updateOne({$set: req.body})
            res.status(200).json('Update successfully!')
        }
        catch(e) {
            res.status(500).json(e)
        }
    },

    deleteList: async (req, res) => {
        try {
            await Card.updateMany(
                {list: req.params.id},
                {list: null}
            )
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json('Delete successfully!')
        }
        catch(e) {
            res.status(500).json(e)
        }
    }
}

module.exports = listController