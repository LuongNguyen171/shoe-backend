const db = require('../dbconnection');

// ...

// Lấy sản phẩm theo Id
exports.getProductImageById = (productId, callback) => {
    const sql = "SELECT * FROM Product_Images WHERE productId = ?";
    db.query(sql, [productId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        return callback(null, results);
    });
};

