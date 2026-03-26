const Product = require('../models/products')
const ProductsModel = require('../models/products')

async function get(req, res) {
const { id } = req.params

const obj = id ? { _id: id } : null

const products = await ProductsModel.find(obj)
   
res.send(products)
}


async function post(req, res) {
    const {
        name,
        brand,
        price,
    } = req.body

    const products = new ProductsModel({
        name,
        brand, 
        price,
    })

    products.save()

    res.send({

    })
}

async function put(req, res) {
    const { id } = req.params

    const products = await ProdyctsModel.findOndeAndUpdate({ _id: id }, req.body, {new: true})

    res.send({
        message: 'Produto atualizado com sucesso',
        products,
    })

/* 
    const products = await ProductsModel.findOne({ _id: id})

    await ProductsModel.updateOne(req.body)

    res.send({
        messagem: 'Produto atualizado com sucesso',
        products,
    })
*/
}

async function remove(req, res) {
    const { id } = req.params

    const remove = await ProductsModel.deleteOne({ _id: id })

   const message = removo.ok ? 'sucesso' : 'erro'

   res.send({
        message,
    })
    
}

module.exports = {
    get,
    post,
    put,
    remove,
}