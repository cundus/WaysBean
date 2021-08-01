import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormSignin from "../forms/FormSignin";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../../config/api";

const SignIn = ({ showSignin, setShowSignin, dispatch }) => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      "Content-Type": "application/json",
    };
    await axios
      .post("http://localhost:4000/api/v1/signin", data, config)
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        setAuthToken(res.data.token);

        history.push("/");
      })
      .catch(() => {
        console.log("Cannot Sign In");
      });
  };

  return (
    <div>
      <Modal
        size="sm"
        show={showSignin}
        onHide={() => setShowSignin(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default SignIn;
