import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Image, Button } from "react-bootstrap";
import Loading from "./Loading";
import Message from "./Message";
import { listProductsTop } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const TopProductsModal = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productListTop = useSelector((state) => state.productListTop);
  const { loading, error, products } = productListTop;

  useEffect(() => {
    dispatch(listProductsTop());
  }, [dispatch]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <>
      <h2>Top Products on Sale</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products.map((product) => (
            <div key={product._id} onClick={() => handleProductClick(product)}>
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
            </div>
          ))}
        </>
      )}

      {selectedProduct && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              fluid
            />
            <h4>${selectedProduct.price}</h4>
            <p>{selectedProduct.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default TopProductsModal;