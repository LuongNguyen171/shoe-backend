const con = require('../dbconnection.js')
const productsModel = require('../models/product.model')
const productsImageModel = require('../models/product_image.model')

//  get all products 
exports.getProducts = (req, res) => {
    var sql = "SELECT * FROM products"

    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
}
// get product by ID 
exports.getProductById = (req, res) => {

    const productId = req.params.productId;

    productsModel.getProductById(productId, (err, product) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the product' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    });

}

exports.getProductByStyleId = (req, res) => {

    const styleId = req.params.styleId;

    productsModel.getProductByStyleId(styleId, (err, products) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while fetching the product' });
        }

        if (!products) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(products);
    });

}
//get the top 10 best sell
exports.getTop10ProductsSoldOut = (req, res) => {
    var sql = "SELECT * FROM products ORDER BY productSoldQt DESC LIMIT 10"

    // const productImage = productsImageModel.getProductImageFist()
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
}

//get the top 10 highest price

exports.getTop10HighestPrice = (req, res) => {
    var sql = "SELECT * FROM products ORDER BY productPrice DESC LIMIT 10"

    con.query(sql, (error, result) => {
        if (error) throw error;
        res.send(result);
    })
}

