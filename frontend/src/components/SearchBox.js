import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
  };

  const buttonStyle = {
    padding: "0.5rem",
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <div style={{ display: "flex" }}>
        <FormControl
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          style={inputStyle}
        />
        <Button type="submit" variant="outline-success" style={buttonStyle}>
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBox;
