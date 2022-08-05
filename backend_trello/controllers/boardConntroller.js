const { Board } = require('../model/model')

const boardController = {
    addBoard: async(req, res) => {
        try{
            const board = new Board(req.body)
            const savedBoard = await board.save()
            res.status(200).json(savedBoard)
        }
        catch(e) {
            res.status(500).json(e)
        }
    },

    getBoard: async(req, res) => {
        try{
            const board = await Board.find()
            res.status(200).json(board)
        }
        catch(e) {
            res.status(500).json(e)
        }
    },

    updateBoard: async(req, res) => {
        try{
            const board = await Board.find()
            await board[0].updateOne({$set: {data: req.body}})
            res.status(200).json('Updated successfully!')
        }
        catch(e) {
            res.status(500).json(e)
        }
    }
}

module.exports = boardController