import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import {
  ORDER_ALL_RESET,
  ORDER_DETAILS_RESET,
} from "../constants/orderConstant";
import { allOrders } from "../actions/orderActions";
import PaginateOrders from "../components/paginateOrder";
import { useParams } from "react-router-dom";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { pageNumber } = useParams() || 1;
  const { keyword } = useParams();

  console.log(orders, "orderss");

  useEffect(() => {
    dispatch({ type: ORDER_ALL_RESET });
    dispatch({ type: ORDER_DETAILS_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    } else {
      dispatch(allOrders(keyword, pageNumber));
    }
  }, [dispatch, navigate, userInfo, pageNumber, keyword]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Is Paid</th>
                <th>Is Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.user && order.user.name != null
                      ? order.user.name
                      : "Deleted Customer"}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
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
          <PaginateOrders pages={pages} page={page} isadmin={true.toString()} />
        </>
      )}
    </>
  );
};

export default OrderListPage;
