import React, { useEffect, useState } from "react";
import { Link, redirect, useLocation, useSearchParams } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/loginActions";
import {
  Form,
  Button,
  Row,
  Col,
  FormLabel,
  FormControl,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

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

  const userLogin = useSelector((state) => state.userLogin);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const {success} = userUpdateProfile

  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }else {
        if(!user.name){
dispatch(getUserDetails('profile'))
        }else{
setName(user.name)
setEmail(user.email)
        }
    }
  }, [navigate, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({id: user._id, name, email, password}))
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated Successfuly</Message>}
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
      </Col>
    </Row>
  );
}

export default ProfilePage;
