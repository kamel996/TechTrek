import React, { useEffect, useState } from "react";
import {
  Link,
  redirect,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { listProductDetails, createProduct } from "../actions/productActions";
import {
  Form,
  Button,
  FormLabel,
  FormControl,
  FormFile,
} from "react-bootstrap";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../constants/productConstant";

function ProductCreatePage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [numReviews, setnumReviews] = useState(0);

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, product, error } = productDetails;

  const productCreate = useSelector((state) => state.productCreate);

  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate("/admin/productlist");
    }
  }, [id, dispatch, navigate, successCreate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${API_URL}/api/uploads`,
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch (error) {}
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        countInStock,
        image,
        brand,
        category,
        description,
        numReviews,
      })
    );
  };

  return (
    <>
      <Link to={"/admin/productlist"} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Product</h1>
        {loadingCreate && <Loading />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="name"
                placeholder="Enter product name"
                value={name}
                required
                minLength={20}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId="price">
              <FormLabel>Price</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId="image">
              <FormLabel>Image</FormLabel>
              <FormControl
                type="text"
                required
                placeholder="Enter Image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></FormControl>
              <Form.Label>Choose File</Form.Label>
              <FormControl type="file" onChange={uploadFileHandler} />
              {uploading && <Loading />}
            </Form.Group>
            <Form.Group controlId="brand">
              <FormLabel>Brand</FormLabel>
              <FormControl
                type="text"
                required
                placeholder="Enter Brand "
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <FormLabel>Count In Stock</FormLabel>
              <FormControl
                type="number"
                required
                placeholder="Enter CountInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId="category">
              <FormLabel>Category</FormLabel>
              <FormControl
                type="text"
                required
                placeholder="Enter category "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></FormControl>
            </Form.Group>
            <Form.Group controlId="description">
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter description "
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              ></FormControl>
            </Form.Group>

            <Button type="submit" variant="primary">
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}
export default ProductCreatePage;
