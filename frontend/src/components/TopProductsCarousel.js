import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loading from "./Loading";
import Message from "./Message";
import { listProductsTop } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
const API_URL = process.env.REACT_APP_API_URL;

const TopProductsCarousel = () => {
  const dispatch = useDispatch();

  const productListTop = useSelector((state) => state.productListTop);
  const { loading, error, products } = productListTop;

  useEffect(() => {
    dispatch(listProductsTop());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark" style={{ borderRadius: "8px" }}>
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={`${API_URL}${product.image}`}
              alt={product.name}
              fluid
              style={{ backgroundColor: "transparent" }}
              className="imgkk"
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} ({product.price} $)
              </h2>
              <h3>{product?.description?.slice(0, 200)}</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TopProductsCarousel;
