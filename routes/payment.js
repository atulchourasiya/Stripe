const express = require("express");
const { create_payment, save_payment, } = require("../controller/paymentController");

const router  = express.Router();


router.post('/create-payment-intent' , create_payment)
router.post('/save-payment' , save_payment)

module.exports = router;