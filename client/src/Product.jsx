import React, { useContext } from "react";
import { productArray } from "./Productdata";
import { CartContext } from "./cartContext";
import showToast from "./toast";

// Product Page
const Product = () => {
  const { cart, setCart } = useContext(CartContext);
  return (
    <>
      <h1 className='text-center my-3' style={{ fontFamily: "serif" }}>
        Products
      </h1>
      <div className='d-flex flex-wrap justify-content-center'>
        {productArray.map((product, index) => {
          return (
            <div key={index} className='card m-2' style={{ width: "18rem" }}>
              <img
                src={product.ProductImage}
                className='card-img-top'
                alt='...'
              />
              <div className='card-body'>
                <h5 className='card-title'>{product.ProductName}</h5>
                <p className='card-text'>{product.ProductDescription}</p>
                <p className='card-text'>Price: {product.ProductPrice}</p>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setCart([...cart, product]);
                    showToast("Added to Cart", "success");
                  }}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Product;
