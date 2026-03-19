//rotas
const router = require('express').Router()
const CustomersController = require('../controllers/customers')
const indexController = require('../controllers/index')

router.get('/', indexController.index)

// registro
router.get('/register', CustomersController.index)
router.post('/register/add', CustomersController.add)

//llista
router.ger('/lister', CustomersController.listUsers)

module.exports = router