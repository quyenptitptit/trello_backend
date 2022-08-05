const router = require('express').Router()
const cardController = require('../controllers/cardController')

router.post('/', cardController.addCard)

router.get('/', cardController.getCard)

router.put('/:id', cardController.updateCard)

router.delete('/:id', cardController.deleteCard)

module.exports = router