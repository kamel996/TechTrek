import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loading from "./Loading";
import Message from "./Message";
import { listProductsTop } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

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
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} ({product.price})
                </h2>
                <h3>{product.description}</h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
         
      ))}
    </Carousel>
  );
};

export default TopProductsCarousel;
