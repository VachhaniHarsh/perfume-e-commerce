import './App.css';
import Footer from './component/layout/Footer/Footer';
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./component/Home/Home.js";


function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route exact path="/" Component={Home} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
