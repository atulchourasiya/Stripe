import React, { useContext } from 'react';
import { CartContext } from './cartContext';
import { CheckOutContext } from './checkoutContext';
import { Link } from 'react-router-dom';
import showToast from './toast';

const Cart = () => {
   const { cart, setCart } = useContext(CartContext);
   const { setCheckOut } = useContext(CheckOutContext);
   return (
      <>
         <h1 className="text-center my-3" style={{ fontFamily: 'serif' }}>Cart</h1>
         <div className="d-flex flex-wrap  justify-content-start">
            {
               cart.map((product, index) => {
                  return (
                     <div key={index} class="card m-2" style={{ width: "18rem" }}>
                        <div className="d-flex justify-content-end w-100 position-absolute m-0 p-0">
                           <button className='btn btn-warning' onClick={() => {
                              setCart(cart.filter((item) => item.ProductName !== product.ProductName));
                              showToast('Removed from Cart', 'success');
                           }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                 <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                              </svg>
                           </button>
                        </div>
                        <img src={product.ProductImage} class="card-img-top" alt="..." />
                        <div class="card-body">
                           <h5 class="card-title">{product.ProductName}</h5>
                           <p class="card-text">{product.ProductDescription}</p>
                           <p class="card-text">Price: {product.ProductPrice}</p>
                        </div>
                     </div>
                  );
               }
               )
            }
         </div>
         <div className="d-flex justify-content-center my-3">
            <Link to={'/checkout'}>
               <button className="btn btn-warning" onClick={() => setCheckOut(cart)}>
                  Procceed to Checkout
               </button>
            </Link>
         </div>
      </>

   );
};

export default Cart;
