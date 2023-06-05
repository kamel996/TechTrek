import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, redirect, useLocation, useSearchParams } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/loginActions";
import {
  Form,
  Button,
  Row,
  Col,
  FormLabel,
  FormControl,
  Table,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { myListOrders } from "../actions/orderActions";
import { useParams } from "react-router-dom";
import PaginateOrders from "../components/paginateOrder";
import { ORDER_DETAILS_RESET } from "../constants/orderConstant";
import { USER_UPDATE_PROFILE_RESET } from "../constants/loginConstant";

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, user, error } = userDetails;

  const orderMyList = useSelector((state) => state.orderMyList);

  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  const userLogin = useSelector((state) => state.userLogin);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { success } = userUpdateProfile;

  const { userInfo } = userLogin;

  const { pageNumber } = useParams() || 1;
  const { keyword } = useParams();

  useEffect(() => {
    dispatch({ type: ORDER_DETAILS_RESET });
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails("profile"));
        dispatch(myListOrders(keyword, pageNumber));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, dispatch, pageNumber, keyword, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">Profile Updated Successfuly</Message>
        )}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </Form.Group>
          <Form.Group controlId="email">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </Form.Group>
          <Form.Group controlId="password">
            <FormLabel>Update Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></FormControl>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loading />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        {order.createdAt && order.createdAt.substring(0, 10)}
                      </td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <p>Paid on delivery</p>
                          )
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="light" className="btn-sm">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
