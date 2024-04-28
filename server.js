const express = require("express");
const connectToMongoose = require("./config/mongo");
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(
   cors({
      origin: `${process.env.CLIENT_URL}`,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
   })
);
const payment = require("./routes/payment")

app.use('/payment',payment)
connectToMongoose();


app.post('/create-payment-intent', );

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});