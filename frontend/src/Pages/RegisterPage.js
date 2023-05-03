import React, { useEffect, useState } from "react";
import { Link, redirect, useLocation, useSearchParams } from "react-router-dom";
import { register } from "../actions/loginActions";
import {
  Form,
  Button,
  Row,
  Col,
  FormLabel,
  FormControl,
} from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null)


  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { loading, userInfo, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password != confirmPassword){
        setMessage("Passwords do not match")
    }else{
    dispatch(register(name, email, password));

    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error&& <Message variant="danger">{error}</Message>}
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
          <FormLabel>password</FormLabel>
          <FormControl
            type="password"
            placeholder="Enter your password"
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
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterPage;
