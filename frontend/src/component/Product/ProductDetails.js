import React, { Fragment, useEffect } from 'react';
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader.js";
import { useAlert} from "react-alert";


const ProductDetails = () => {

  const alert = useAlert();
  
  const { id } = useParams();

  const dispatch = useDispatch();
  
  const { product,loading,error} = useSelector(state => state.productDetails);

  useEffect(() => { 
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));

  }, [dispatch, id, error, alert]);
  
  const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "rgb(129, 36, 36)",
        size: window.innerWidth < 600 ? 20:25,
        value: product.ratings,
        isHalf : true,
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment className="fragClass">   
        <div className="ProductDetails">
          {/* <div> */}
            <Carousel className='Photo'>
              {product.images && product.images.map((item,i) =>
                <center>
                  <img className="CarouselImage" src={item.url} key={item.url} alt={`${i} Slide`} />
                </center>
              )}
            </Carousel>
          {/* </div> */}
          
          <div>
            <div className='detailsBlock-1'>
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            
            <div className='detailsBlock-2'>
              <ReactStars {...options} />
              <span>{"  "}({product.numOfReviews} Reviews)</span>
            </div>

            <div className='detailsBlock-3'>
              <h1>
                {`₹ ${product.price}`}
              </h1>

              <div className="detailsBlock-3-1">

                <div className="detialsBlock-3-1-1">
                  <button>-</button>
                  <input value="1" size={9} />
                  <button>+</button>
                </div>{" "}

                <button>Add to Cart</button>
              </div>

              <p>
                Status:{" "}  
                <b className={product.stock<1 ? "redColor" : "greenColor"}>
                  {product.stock<1 ? "Out of Stock!": "In Stock!"}
                </b>
              </p>

            </div>

            <div className="detailsBlock-4">
              Description : <p>{ product.description}</p>
            </div>

            <button className="submitReview">Submit Review</button>

          </div>

        </div>

        <div className="allReviews">

        <h3 className="reviewsHeading" > Reviews</h3>
        
        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews && 
              product.reviews.map((review) => <ReviewCard review={ review} />)
            }
          </div>
        ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          
        </div>
      </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetails;
