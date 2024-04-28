import React, { useContext } from 'react';
import { productArray } from './Productdata';
import { CartContext } from './cartContext';
import showToast from './toast';

const Product = () => {
   const { cart, setCart } = useContext(CartContext);
   return (
      <>
         <h1 className="text-center my-3" style={{ fontFamily: 'serif' }}>Products</h1>
      <div className="d-flex flex-wrap justify-content-center">
         {
         productArray.map((product, index) => {
            return (
               <div key={index} class="card m-2" style={{ width: "18rem" }}>
                  <img src={product.ProductImage} class="card-img-top" alt="..." />
                  <div class="card-body">
                     <h5 class="card-title">{product.ProductName}</h5>
                     <p class="card-text">{product.ProductDescription}</p>
                     <p class="card-text">Price: {product.ProductPrice}</p>
                     <button class="btn btn-primary" onClick={()=>{
                        setCart([...cart, product]);
                        showToast('Added to Cart' , 'success');
                     }}>Add to Cart</button>
                  </div>
               </div>
            );
         }
         )
         }
      </div>
      </>

   );
};

export default Product;
