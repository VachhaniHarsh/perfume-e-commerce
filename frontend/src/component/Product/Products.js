import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from '../Home/ProductCard.js'
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';




const Products = () => {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);

  const { products, loading, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
  
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (event,newPrice) => {
    setPrice(newPrice);
  }
  
    useEffect(() => { 
        dispatch(getProduct(keyword,currentPage,price));
    }, [dispatch, keyword, currentPage, price]);
      
  return (
      <Fragment>
          {loading ? (<Loader />) : (
              <Fragment>
                  <h2 className="productsHeading">Products</h2>

                  <div className="products"> 
                    {products && products.map((product) => (
                        <ProductCard key={ product.id} product={product} />
                        ))}
          </div>
          
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={50000}
            />

            <Typography>Categories</Typography>
            

            </div>

          
          {resultPerPage < productsCount &&  
            <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Previous"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
          }
          
              </Fragment>
          )}
    </Fragment>
  )
}

export default Products;
