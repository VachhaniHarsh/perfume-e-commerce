import './App.css';
import Footer from './component/layout/Footer/Footer';
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./component/Home/Home.js";
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from "./component/Product/Search.js";


function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
