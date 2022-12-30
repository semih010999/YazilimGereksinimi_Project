import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function product({ product }) {
  return (
    <div>
      <div className="card mb-10">
        <div className="car-body">
          <div className="card-img-actions">
            <img src={`/images${product.image}`} className="card-img img-fluid" alt="card"></img>
          </div>
        </div>
        <div className="card-bbody bg-light text-center">
          <div className="mb-2">
            <h6>
              <Link to={`/product/${product._id}`}>
                <a className="product-title">{product.name}</a>
              </Link>
            </h6>

            <span className="product-category">{product.category}</span>
          </div>
          <div>
            <Rating value={product.rating} color={"#ffdf00"}></Rating>
          </div>
          <div className='text-muted mb-3'>{product.numReviews}</div>
          <h3 className="mb-10">{product.price}</h3>
          <Link to={`/product/${product._id}`}>
            <button class="btn btn-outline-primary">Add</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
