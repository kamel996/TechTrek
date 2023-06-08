import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import Loading from "../components/Loading";
import {
  ORDER_CREATE_RESET,
  ORDER_DETAILS_RESET,
} from "../constants/orderConstant";
import { CARD_RESET_ITEM } from "../constants/cartContant";

const API_URL = process.env.REACT_APP_API_URL;

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const { itemsPrice } = cart;
  cart.itemsPrice = addDecimals(
    cart.cardItems &&
      cart.cardItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = 50;

  cart.taxPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error, loading } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
      dispatch({type: CARD_RESET_ITEM})
    }
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cardItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        shippingPrice: cart.shippingPrice,
        itemsPrice: cart.itemsPrice,
      })
    );
    localStorage.removeItem("cartItems");
    dispatch({ type: ORDER_DETAILS_RESET });

  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              {order && order.shippingAddress && (
                <p>
                  <strong>
                    Address:
                    <br />
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                    , {cart.shippingAddress.postalCode} ,{" "}
                    {cart.shippingAddress.country}{" "}
                  </strong>
                </p>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method: </strong>

              <strong>{cart.paymentMethod}</strong>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cardItems && cart.cardItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cardItems &&
                    cart.cardItems.map((item, index) => (
                      <ListGroupItem key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={`${API_URL}${item.image}`}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {Number(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroupItem>
                    ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${Number(cart.itemsPrice).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${Number(cart.taxPrice).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {Number(cart.totalPrice).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>
              <ListGroupItem>
                {loading ? (
                  <Loading />
                ) : (
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cardItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                )}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
