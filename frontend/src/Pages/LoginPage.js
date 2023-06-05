import React, { useEffect, useState } from "react";
import { Link, redirect, useLocation, useSearchParams } from "react-router-dom";
import { login } from "../actions/loginActions";
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
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { loading, userInfo, error } = userLogin;
  

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));

  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
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
        <Button type="submit" variant="primary" style={{marginTop: '5px'}}>
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <strong>
              Register
            </strong>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginPage;
