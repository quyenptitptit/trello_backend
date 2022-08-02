const router = require('express').Router()
const cardController = require('../controllers/cardController')

router.post('/', cardController.addCard)

router.get('/', cardController.getCard)

router.put('/:id', cardController.updateCard)

router.put('/updateIdx/:id', cardController.updateIdxCard)

router.delete('/:id', cardController.deleteCard)

module.exports = router