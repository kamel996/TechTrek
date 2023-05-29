import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const API_URL = process.env.REACT_APP_API_URL;


function Product({ product }) {
  const renderDescription = () => {
    if (product.description.length <= 40) {
      
      return <Card.Text>{product.description}</Card.Text>;
    } else {
      const truncatedDescription = product.description.substring(0, 40) + "...";
      return (
        <>
          {" "}
       
          <p>{truncatedDescription}</p>
        </>
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts or updates 4bbf73;
  }, []);

  return (
    <>
      <Card
        className="my-3 p-3 rounded product-card cardp"
        style={{ border: "2px solid #ccc", height: "90%" }}
      >
        <Link to={`/product/${product._id}#top`} className="product-image-link">
          <Card.Img
            src={`${API_URL}${product.image}`}
            variant="top"
            className="product-image"
            style={{objectFit: 'contain'}}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`} className="product-name-link">
            <Card.Title
              as="div"
              className="product-name"
              style={{
                height: "3rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {product.name}
            </Card.Title>
          </Link>
          <Card.Text as="div" className="product-rating">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3" className="product-price">
            ${product.price}
          </Card.Text>
          {renderDescription()}
          <Link
            to={`/product/${product._id}`}
            className="product-details-link"
            style={{ textDecoration: "none" }}
          >
            <strong className="descripti">Description</strong>
          </Link>
          <Card.Footer
            style={{
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {product.countInStock <= 0 && (
              <Button
                variant="primary"
                disabled={product.countInStock <= 0}
                className="buy-now-buttonn"
              >
                Out Of Stock
              </Button>
            )}

            {product.countInStock > 0 && (
              <Link to={`/product/${product._id}`}>
                <Button
                  variant="primary"
                  disabled={product.countInStock <= 0}
                  className="buy-now-button"
                >
                  Buy Now
                </Button>
              </Link>
            )}
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
}

export default Product;
