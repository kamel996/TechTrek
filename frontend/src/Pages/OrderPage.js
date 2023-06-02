import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  FormCheck,
} from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loading";
import {
  deliveredOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import {
  ORDER_DELIVERED_RESET,
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstant";
import axios from "axios";
import Loading from "../components/Loading";

const API_URL = process.env.REACT_APP_API_URL;

const OrderPage = () => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success: successDelivered } =
    orderDelivered;

  const orderCreate = useSelector((state) => state.orderCreate);

  const { success } = orderCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const { id } = useParams();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  if (!loading && order) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPaypalScript = async () => {
      try {
        const { data: clientId } = await axios.get(
          "http://localhost:5000/api/config/paypal"
        );

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      } catch (error) {
        throw new Error(
          `SDK Validation error: 'Invalid query value for client-id: `
        );
      }
    };

    if (!order || successPay || successDelivered) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, successPay, successDelivered, navigate, id, success, order]);

  const deliverHandler = () => {
    dispatch(deliveredOrder(id));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      {order && order.orderItems && order.user && (
        <>
          {order.isPaid && <h1>Order {order._id}</h1>}
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>Shipping</h2>
                  <p>
                    {" "}
                    <strong>Name: {order.user.name}</strong>
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  {order &&
                    order.shippingAddress &&
                    order.shippingAddress.address && (
                      <p>
                        <strong>
                          Address:
                          <br />
                          {order.shippingAddress.address},{" "}
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.postalCode},{" "}
                          {order.shippingAddress.country}
                        </strong>
                      </p>
                    )}
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered On {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>

                    <strong>{order.paymentMethod}</strong>
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid On {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroupItem>

                <ListGroupItem>
                  <h2>Order Items</h2>
                  {order && order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order &&
                        order.orderItems.map((item, index) => (
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
                                {item.qty * item.price}
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
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>

                  {order && !order.isPaid && order.paymentMethod =="PayPal" &&  (
                    <ListGroupItem>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroupItem>
                  )}

                  {error && (
                    <ListGroupItem>
                      <Message variant="danger">{error}</Message>{" "}
                    </ListGroupItem>
                  )}

                  {userInfo &&
                    userInfo.isAdmin &&
                    !order.isDelivered && (
                      <ListGroupItem>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                        {loadingDelivered && <Loading />}
                      </ListGroupItem>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderPage;
