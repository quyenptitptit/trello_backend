const reactDom = require('react-dom')
const { Card, List, Board } = require('../model/model')

const swapList = (list, fromList, toList) => {
    const element = list[fromList]
    list.splice(fromList, 1)
    list.splice(toList, 0, element)
    return list
}

const listController = {
    addList: async (req, res) => {
        try {
            const nenwList = new List(req.body)
            const savedList = await nenwList.save()
            const board = Board.find()
            await board.updateOne({ $push: { data: savedList } })
            res.status(200).json(savedList)
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    getAList: async (req, res) => {
        try {
            const list = await List.findById(req.params.id).populate('card')
            res.status(200).json(list)
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    getList: async (req, res) => {
        try {
            const lists = await List.find()
            res.status(200).json(lists)
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    updateList: async (req, res) => {
        try {
            const list = await List.findById(req.params.id).populate('card')
            await list.updateOne({ $set: req.body })
            res.status(200).json('Update successfully!')
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    deleteList: async (req, res) => {
        try {
            // await Card.updateMany(
            //     { list: req.params.id },
            //     { list: null }
            // )
            await Card.deleteMany(
                { listId: req.params.id }
            )
            await Board.updateMany(
                { data: req.params.id },
                { $pull: { data: req.params.id } }
            )
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json('Delete successfully!')
        }
        catch (e) {
            res.status(500).json(e)
        }
    },

    updateIdxList: async (req, res) => {
        try {
            const lists = await List.find().populate('card')
            await swapList(lists, req.params.id, req.body.toList)
            List.updateOne({}, { $set: req.body })
            res.status(200).json(lists)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }

}

module.exports = listController