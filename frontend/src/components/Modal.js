import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Image, Button } from "react-bootstrap";
import Loading from "./Loading";
import Message from "./Message";
import { listProductsTop } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const TopProductsModal = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(true);

  const productListTop = useSelector((state) => state.productListTop);
  const { loading, error, products } = productListTop;

  const selectedProduct = products && products.slice(0, 1);

  useEffect(() => {
    dispatch(listProductsTop());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timeout);
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
  };

  console.log(selectedProduct, "from prod");

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {selectedProduct.map((item) => (
            <Modal show={showModal} onHide={handleModalClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Our Top Rated Product</Modal.Title>
              </Modal.Header>
              <div style={{ display: "flex", backgroundColor: "black" }}>
                <Modal.Body style={{ flex: "1" }}>
                  <h4 style={{color: 'white'}}>{item.name}</h4>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fluid
                    style={{ height: "20rem" }}
                  />
                </Modal.Body>
                <Modal.Body style={{ flex: "0.5" }}>
                  <div>
                    <p>buy it now</p>
                  </div>
                </Modal.Body>
              </div>

              <Modal.Footer>
                <Button>buy now</Button>
              </Modal.Footer>
            </Modal>
          ))}
        </>
      )}
    </>
  );
};

export default TopProductsModal;
