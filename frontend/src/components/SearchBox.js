import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  const inputStyle = {
    marginRight: "0.17rem",
    marginLeft: "5rem",
    borderRadius: "4 px",
  };

  const buttonStyle = {
    padding: "0.5rem",
    borderRadius: "4px",
  };

  return (
    <Form onSubmit={submitHandler} inline="true">
      <div style={{ display: "flex" }}>
        <FormControl
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          style={inputStyle}
          className="searchk"
        />
        <Button type="submit" variant="outline-search" style={buttonStyle}>
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBox;
