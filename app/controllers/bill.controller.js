const billModel = require('../models/bill.model')

exports.createBill = async (req, res) => {
    const newBill = req.body

    try {
        resultCreateBill = await billModel.createProductBill(newBill)

        res.status(201).json({ message: 'bill created successfully' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error has occurred when creating bill' })
    }
}

exports.getBillByUser = async (req, res) => {

    try {
        const userEmail = req.query.userEmail;

        bills = await billModel.getBillByUserEmail(userEmail)

        res.status(200).json({ bills })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error has occurred when creating bill' })
    }
}

exports.productOrder = async (req, res) => {

    try {
        const { userEmail, userName } = req.body

        const productLink = `${req.protocol}://${process.env.HOST_CLIENT}/product`
        const { sendProductOrder } = require('./mail.controller')

        sendProductOrder(userEmail, userName, productLink)
        return res.status(200).json({ message: "this mail has been sent!. please check your email" })

    } catch (error) {
        console.log(error)

        return res.status(404).json({ message: 'this email not exist!' });

    }

}