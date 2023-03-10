import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Checkout from './scenes/checkout/Checkout';
import Confirmation from './scenes/checkout/Confirmation';
import NavBar from './scenes/global/NavBar';
import Home from './scenes/home/Home';
import ProductDetails from './scenes/productDetails/ProductDetails';
import CartMenu from './scenes/global/CartMenu';
import Footer from './scenes/global/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product/:productId" element={<ProductDetails />}/>
          <Route path="checkout" element={<Checkout />}/>
          <Route path="checkout/success" element={<Confirmation />}/>
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
