import React, { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  FormControl,
  Button,
  ListGroupItem,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

import Message from "../components/Message";
const CartPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  const qty =
    searchParams && searchParams.get("qty")
      ? Number(searchParams.get("qty")[0])
      : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  console.log(qty, "imqtyyryy");

  const { cardItems } = cart;
  const countInStock = cardItems?.countInStock;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty, countInStock && countInStock, render]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
    setRender((prev) => !prev);
  };
  console.log("carditemmms", cardItems);
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cardItems && cardItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cardItems &&
              cardItems.map((item) => {
                return (
                  <ListGroupItem key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>$ {item.price}</Col>
                      <Col md={2}>
                        {item.countInStock >= 1 && (
                          <FormControl
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              const updatedQty = Number(e.target.value);
                              dispatch(addToCart(item.product, updatedQty));
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </FormControl>
                        )}
                      </Col>

                      <Col>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                );
              })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Subtotal (
                {cardItems &&
                  cardItems.reduce((acc, item) => acc + item.qty, 0)}
                ) items
              </h2>
              <br />
              <strong>
                $
                {cardItems &&
                  cardItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
              </strong>
            </ListGroupItem>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cardItems && cardItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
