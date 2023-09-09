const db = require('../dbconnection')

exports.createProductBill = async (newBill) => {
    const { userName, userEmail, userAddress, userPhoneNumber, productId, quantityPurchased, datePurchase } = newBill
    const sql = "INSERT INTO bills (userName,userEmail,userAddress,userPhoneNumber,productId,quantityPurchased,datePurchase) VALUES (?,?,?,?,?,?,?)"
    const [result] = await db.promise().execute(sql, [userName, userEmail, userAddress, userPhoneNumber, productId, quantityPurchased, datePurchase])

    return result.insertId
}

exports.getBillByUserEmail = async (userEmail) => {

    const sql = 'SELECT bills.*, products.*, (products.productPrice * bills.quantityPurchased) AS orderValue FROM bills, products WHERE bills.productId = products.productId AND userEmail = ?';

    const [result] = await db.promise().execute(sql, [userEmail]);
    return result
};

