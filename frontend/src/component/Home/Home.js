import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css"; 
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import { getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";


const product = {
  name:"PDM Greenley",
  price: "₹ 3333",
  _id: "dummyProduct",
  images: [{ url:"https://www.maxaroma.com/images/product-story/story-images/UP3700578500861_two.png?verP=1671478563"}],
} 

const Home = () => {
  const dispatch = useDispatch();
  const {loading,error,products,productsCount} = useSelector((state)=>state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>

      <MetaData title="OdeurX"></MetaData>

      <div className="banner">
        <p>Welcome to OdeurX.</p>
        <h1>Find Amazing Products here</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      
      <h2 className="homeHeading">
        Featured Products
      </h2>

      <div className="container" id="container">        
        {products && products.map(
          product => (
            <Product product={product}/>
            )
          )}
      </div>
      
    </Fragment>
  )
};

export default Home;
