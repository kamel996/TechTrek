import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.js";
import { listProducts } from "../actions/productActions.js";
import Loading from "../components/Loading.js";
import Message from "../components/Message.js";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate.js";
import TopProductsCarousel from "../components/TopProductsCarousel.js";

function HomePage() {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const { pageNumber } = useParams();

  console.log(useParams());

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <TopProductsCarousel />}
      <h1 style={{ marginTop: "0.6rem" }}>Latest Products</h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row style={{ backgroundColor: "whitesmoke" }}>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={4} lg={3} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
            isadmin={false.toString()}
            home={true.toString()}
          />
        </>
      )}
    </>
  );
}

export default HomePage;
