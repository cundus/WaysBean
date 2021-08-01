import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const Signup = ({ showSignup, setShowSignup }) => {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
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
          role_id: "",
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
        size="sm"
        show={showSignup}
        onHide={() => setShowSignup(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="FormBasicname" className="mb-3">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter Fullname"
            />
          </Form.Group>

          <Form.Group controlId="FormBasicEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group controlId="FormBasicrole" className="mb-3">
            <Form.Label>role</Form.Label>
            <Form.Control
              type="number"
              name="role"
              value={data.role}
              onChange={handleChange}
              placeholder="Enter role"
            />
          </Form.Group>
          <Form.Group controlId="FormBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </Form.Group>
          <Button className="modal-btn" type="submit">
            Sign Up
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Signup;
