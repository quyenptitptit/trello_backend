const router = require('express').Router()

const listController = require('../controllers/listController')

router.post('/', listController.addList)

router.get('/', listController.getList)

router.put('/:id', listController.updateList)

router.delete('/:id', listController.deleteList)

module.exports = router