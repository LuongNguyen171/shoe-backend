const db = require('../dbconnection');

// ...

// Lấy sản phẩm theo Id
exports.getProductById = (productId, callback) => {
    const sql = "SELECT * FROM products WHERE productId = ?";
    db.query(sql, [productId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        return callback(null, results[0]);
    });
};

exports.getProductByStyleId = (styleId, callback) => {
    const sql = "SELECT * FROM products WHERE styleId = ?";
    db.query(sql, [styleId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        return callback(null, results);
    });
};



