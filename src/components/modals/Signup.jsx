import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { API } from "../../config/api";

const Signup = ({ showSignup, setShowSignup, setShowSignin }) => {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageOk, setMessageOk] = useState("");

  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    role: 2,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(false);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ ...data });
      const res = await API.post("/signup", body, config);

      console.log(res);
      setData({
        name: "",
        email: "",
        password: "",
        role: 2,
      });
      setMessageOk("Success Create Account, You Can Login Now");
    } catch (error) {
      const { response } = error;
      console.log(response.data.message);
      setIsError(true);
      setMessage(response.data.message);
    }
  };

  return (
    <div>
      <Modal
        centered
        show={showSignup}
        onHide={() => setShowSignup(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <div className="p-4 px-5">
          <h2 className="fw-bold color-dominant mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            {isError && <Alert variant="danger">{message}</Alert>}
            {messageOk && <Alert variant="success">{messageOk}</Alert>}
            <Form.Group controlId="FormBasicname" className="mb-3">
              <Form.Control
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter Fullname"
                className="form-dominant color-dominant"
              />
            </Form.Group>

            <Form.Group controlId="FormBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="form-dominant color-dominant"
              />
            </Form.Group>

            <Form.Group controlId="FormBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="form-dominant color-dominant"
              />
            </Form.Group>
            <Button
              className="button-dominant mt-3 py-2 px-3 fullwidth fw-600"
              type="submit"
            >
              Sign Up
            </Button>
            <p className="text-center mt-4">
              Already have an account ? Click{" "}
              <span
                className="fw-bold cursor-pointer"
                onClick={() => {
                  setShowSignup(false);
                  setShowSignin(true);
                }}
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

export default Signup;
