import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Modal } from "react-bootstrap";
import Product from "../components/Product.js";
import { listProducts } from "../actions/productActions.js";
import Loading from "../components/Loading.js";
import Message from "../components/Message.js";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate.js";
import TopProductsCarousel from "../components/TopProductsCarousel.js";
import TopProductsModal from "../components/Modal.js";

function HomePage() {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const { pageNumber } = useParams();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  const isMobileDevice = window.innerWidth <= 768;
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      {!keyword && <TopProductsCarousel />}
      <h1 style={{ marginTop: "0.6rem" }}>Latest Products</h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products
              ?.slice(0, isMobileDevice ? 5 : products?.length)
              ?.map((product) => (
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
    </div>
  );
}

export default HomePage;
