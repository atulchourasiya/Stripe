import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { CheckOutContext } from './checkoutContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { CartContext } from './cartContext';
import showToast from './toast';

const stripePromise = loadStripe('pk_test_51MTN9nSG7PPFG3JNX00oeUSXGMHTASyFXzd92aWSrq2tBL1FchSHaUbH76qOUzuIwViKBDKY6dOsc4gUNnwxKrUw00h4PLsrsm');



const Form = ({
   clientSecret
   , total
   , item
}) => {
   const navigate = useNavigate();
   const stripe = useStripe();
   const elements = useElements();
   const [isProcessing, setIsProcessing] = useState(false);
   const { setCart } = useContext(CartContext);
   const { setCheckOut } = useContext(CheckOutContext);
   const [order, setOrder] = useState({
      email: '',
      name: '',
      state: '',
      country: '',
      postal_code: '',
      city: '',
      line1: '',
   });

   const handleInputChange = (e) => {
      setOrder({
         ...order,
         [e.target.name]: e.target.value
      });
   };
   const handleSubmit = async (event) => {
      event.preventDefault();
      setIsProcessing(true);


      if (!stripe || !elements || !clientSecret) {
         alert('Stripe.js has not loaded yet. Make sure to wait until Stripe.js has loaded.');
         // Stripe.js has not loaded yet. Make sure to wait until Stripe.js has loaded.
         setIsProcessing(false);
         return;

      }


      const cardElement = elements.getElement(CardElement);
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card: cardElement,
         billing_details: {
            name: order.name,
            email: order.email,
            address: {
               city: order.city,
               state: order.state,
               postal_code: order.postal_code,
               country: 'IN',
            },
         },
      });

      if (paymentMethodError) {
         console.log('Something went wrong:', paymentMethodError);
         setIsProcessing(false);
         return;
      }

      const { error: confirmationError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
         payment_method: paymentMethod.id,
      });
      if (confirmationError) {
         console.log('Payment failed:', confirmationError.payment_intent.id);
         fetch('http://localhost:3000/payment/save-payment', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: order.name, email: order.email, item: [...item], paymentStatus: 'failed', transactionId: confirmationError.payment_intent.id })
         })
         showToast('Payment Failed', 'error');
         setIsProcessing(false);
         console.log('Payment failed:', confirmationError);
      } else {
         console.log('Payment succeeded:', paymentIntent);
         setIsProcessing(false);
         fetch('http://localhost:3000/payment/save-payment', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: order.name, email: order.email, item: [...item], paymentStatus: 'completed', transactionId: paymentIntent.id })
         });
         showToast('Payment Successful', 'success');
         setCart([]);
         setCheckOut([]);
         navigate('/thanks');
      }
   };

   return (
      <>
         {isProcessing && <div className="d-flex justify-content-center align-items-center h-100 position-absolute">
            <Loader />
         </div>}
         <form onSubmit={handleSubmit} className='container p-3 rounded m-2' style={{ padding: "2rem", boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
            <h3 style={{ fontFamily: 'serif' }}>Payment</h3>
            <input required className='form-control my-2' onChange={handleInputChange} placeholder='email' type="email" name='email' />
            <input required className='form-control my-2' onChange={handleInputChange} placeholder='name' type="text" name='name' />
            <input required className='form-control my-2' onChange={handleInputChange} placeholder='city' type="text" name='city' />
            <input required className='form-control my-2' onChange={handleInputChange} placeholder='state' type="text" name='state' />
            <input required className='form-control my-2' onChange={handleInputChange} placeholder='postal Code' type="number" name='postal_code' />
            <CardElement />
            <input required className='form-control my-2' onChange={handleInputChange} placeholder='total' type="text" name='total' value={total} disabled />
            <button type="submit" disabled={!stripe} className={'btn btn-primary mt-2'} >
               Pay
            </button>
         </form>
      </>
   );
};

const CheckoutForm = () => {

   const [clientSecret, setClientSecret] = useState(null);
   const { checkout } = useContext(CheckOutContext);
   const [isProcessing, setIsProcessing] = useState(false);

   useEffect(() => {
      // Fetch the client secret from your server here
      // For example:
      setIsProcessing(true);
      fetch('http://localhost:3000/payment/create-payment-intent', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ amount: checkout.reduce((acc, curr) => acc + curr.ProductPrice, 0) * 100, currency: 'inr', description: 'Payment for order' })
      })
         .then(res => res.json())
         .then(data => {
            setClientSecret(data.client_secret);
            setIsProcessing(false);
         }).catch(err => {
            console.log(err);
            setIsProcessing(false);
         });
   }, []);

   return (
      <>
         {isProcessing && <div className="d-flex justify-content-center align-items-center h-100 w-100 position-absolute">
            <Loader />
         </div>}
         <div className="row w-100">
            <div className="col-6 p-0">
               <div className='w-100 m-4' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                  <h2 className='p-2' style={{ fontFamily: 'serif' }}>Item Purchased</h2>
                  <table className="table" >
                     <thead>
                        <tr>
                           <th >Product Image</th>
                           <th >Name</th>
                           <th >Price</th>
                        </tr>
                     </thead>
                     <tbody>
                        {checkout.map((product, index) => {
                           return (
                              <tr key={index}>
                                 <td ><img className='rounded-circle' src={product.ProductImage} alt="..." style={{ width: '50px', height: '50px' }} /></td>
                                 <td >{product.ProductName}</td>
                                 <td >{product.ProductPrice}</td>
                              </tr>
                           );
                        }
                        )}
                     </tbody>
                  </table>
                  <hr />
                  <div className="d-flex justify-content-between px-4">
                     <h4 style={{ fontFamily: 'serif' }}>Total</h4>
                     <h4 style={{ fontFamily: 'serif' }}>{checkout.reduce((acc, curr) => acc + curr.ProductPrice, 0)}</h4>
                  </div>
               </div>
            </div>
            <div className="col-6 p-4">
               {clientSecret && <Elements stripe={stripePromise} options={{ clientSecret }} >
                  <Form clientSecret={clientSecret} total={checkout.reduce((acc, curr) => acc + curr.ProductPrice, 0)} item={checkout} />
               </Elements>}
            </div>
         </div>
      </>
   );
};

export default CheckoutForm;
