import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../component/Rating";
import "../my.css";
import { useDispatch, useSelector } from "react-redux";
import { ListProductsDetails } from "../actions/productListAction";
import { Button, Col, Row } from "react-bootstrap";
import Message from "../component/Message";
import Loader from "../component/Loader";

function ProductScreen() {
  const [qty, setQty] = useState();

  let navigate = useNavigate();

  const addToCartHandler = () => {
    let path = `/cart/${id}?qty=${qty}`;
    navigate(path);
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(ListProductsDetails(`${id}`));
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row md={20}>
          <div>
            <div className="header">
              <div className="row">
                <div className="col-md-9">
                  <h2 className="product.title underline">{product.name}</h2>
                </div>
                <div className="com-md-3">
                  <Rating value={product.rating} color={"#ffdf00"}></Rating>
                </div>
              </div>
            </div>
            <Row>
              <Col md={10}>
                <ul>
                  <li> Category:{product.category}</li>
                  <li> Brand:{product.brand}</li>
                  <li> Stock :{product.countInStock}</li>
                  <li> Price:{product.price}</li>
                </ul>

                <div className="col-md-12">Properties:</div>
                <div className="col-md-12">{product.description}</div>

                <div className="col-md-12 mt-20">
                  <div className="col-md-12 mt-20"></div>
                  <div className="col-md-60 mt-20">
                    
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={10}>
                <div className="col-md-7 mt-30">
                  <img
                    src={product.image}
                    className="card-img img-fluid ing-detail-full"
                  ></img>
                </div>
                <Button
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                      variant="primary"
                    >
                      Add to cart
                </Button>
              </Col>
            </Row>
          </div>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
