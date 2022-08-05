const router = require('express').Router()

const listController = require('../controllers/listController')

router.post('/', listController.addList)

router.get('/', listController.getList)

router.get('/:id', listController.getAList)

router.put('/:id', listController.updateList)

router.put('/updateIdx/:id', listController.updateIdxList)

router.delete('/:id', listController.deleteList)


module.exports = router