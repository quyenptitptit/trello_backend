const boardController = require('../controllers/boardConntroller')
const router = require('express').Router()

router.post('/', boardController.addBoard)

router.get('/', boardController.getBoard)

router.put('/', boardController.updateBoard)

module.exports = router