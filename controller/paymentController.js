const Payment = require('../modal/payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const create_payment = async (req, res) => {
   const { amount, currency , description } = req.body;

   try {
      const paymentIntent = await stripe.paymentIntents.create({
         amount,
         currency,
         description:  description
      });

      res.status(200).send(paymentIntent);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};

const save_payment = async (req, res) => {
   const { name, email, item, paymentStatus, transactionId } = req.body;
   try {
      const payment = new Payment({
         name,
         email,
         item,
         paymentStatus,
         transactionId
      });

      await payment.save();
      res.status(200).send(payment);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
};


module.exports = { create_payment , save_payment};