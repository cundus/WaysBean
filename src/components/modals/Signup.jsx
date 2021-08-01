import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const Signup = ({ showSignup, setShowSignup }) => {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    role_id: 2,
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
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({ ...data });

    await axios
      .post("http://localhost:4000/api/v1/signup", body, config)
      .then((res) => {
        console.log(res);
        setData({
          name: "",
          email: "",
          role_id: 2,
          password: "",
        });
        alert("Berhasil sign up");
      })
      .catch((error) => {
        console.log(error);
      });
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

export default Signup;
