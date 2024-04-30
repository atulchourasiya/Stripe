import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Product from './Product';
import Cart from './Cart';
import CheckoutForm from './Checkout';
import Thanks from './Thanks';


const App = () => {
  return (
    <>
      < Navbar />
      <Routes>
        {/* Routes of Application */}
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </>

  );
};

export default App;