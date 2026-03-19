// Verbos HTTP (4 Tipos)
// GET - Buscar de dados
// POST - Enviar dados / Receber dados 
//PUT - Atualizar dados
// DELETE - Deletar dados

const router = require('express').Router()

const ProductsController = require('../controllers/products')


router.get('/products', ProductsController.get)
router.post('/products', ProductsController.post)
router.put('/products/:id', ProductsController.put)
router.remove('/products/:id', ProductsController.delete)



module.exports = router;