import './App.css';
import Footer from './component/layout/Footer/Footer';
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./component/Home/Home.js";
import ProductDetails from './component/Product/ProductDetails.js';


function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
