import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import LoginBtn from "../../assets/LoginBtn.svg";

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
        size="md"
        show={showSignin}
        onHide={() => setShowSignin(false)}
        centered
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <div className="p-5">
          <h2 className="fw-bold color-dominant mb-5">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                className="form-dominant color-dominant"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="form-dominant color-dominant"
              />
            </Form.Group>

            <Button
              className="button-dominant mt-3 py-2 px-3 fullwidth fw-600"
              type="submit"
            >
              Submit
            </Button>
            <p className="text-center mt-4">
              Don't have an account ? Click{" "}
              <span
                className="fw-bold cursor-pointer"
                onClick={() => console.log("OK")}
              >
                Here
              </span>
            </p>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default SignIn;
