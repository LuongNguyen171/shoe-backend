const express = require('express');
const router = express.Router();

const billController = require('../controllers/bill.controller')

router.post('/createBill', billController.createBill)
router.get('/getBillByUserEmail', billController.getBillByUser)

router.post('/product-order', billController.productOrder)


module.exports = router