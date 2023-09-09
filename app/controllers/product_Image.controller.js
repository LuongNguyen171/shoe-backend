
const productsImageModel = require('../models/product_image.model')


exports.getProductImageById = (req, res) => {

    const productId = req.params.productId;

    productsImageModel.getProductImageById(productId, (err, product) => {
        try {
            res.json(product);

        } catch (err) {

            if (err) {
                return res.status(500).json({ error: 'An error occurred while fetching the product' });
            }
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
        }

    });

}
