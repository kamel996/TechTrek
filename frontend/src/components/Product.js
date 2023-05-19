import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  const renderDescription = () => {
    if (product.description.length <= 40) {
      return <Card.Text>{product.description}</Card.Text>;
    } else {
      const truncatedDescription = product.description.substring(0, 40) + "...";
      return (
        <>
          <Card.Text>{truncatedDescription}</Card.Text>
          <Link to={`/product/${product._id}`}>More Details</Link>
        </>
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts or updates
  }, []);

  return (
    <Card
      className="my-3 p-3 rounded"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "15rem",
        maxWidth: "100%",
      }}
    >
      <Link to={`/product/${product._id}#top`}>
        <Card.Img src={product.image} variant="top" maxHeight="15rem" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
        {renderDescription()}
        <Card.Footer>
          <Link to={`/product/${product._id}`}>
            <Button variant="primary">Buy Now</Button>
          </Link>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default Product;
