import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import LoginBtn from "../../assets/LoginBtn.svg";

import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../config/api";

const SignIn = ({ showSignin, setShowSignin, dispatch, setShowSignup }) => {
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

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

    try {
      setIsError(false);
      const config = {
        "Content-Type": "application/json",
      };
      const res = await API.post("/signin", data, config);
      console.log("data Login", res.data);
      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
      setAuthToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      history.push(res.data.role_id === 2 ? "/" : "/dashboard");
    } catch (error) {
      if (error) {
        const { response } = error;
        console.log(response.data.message);
        setIsError(true);
        setMessage(response.data.message);
      }
    }
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
            {isError && <Alert variant="danger">{message}</Alert>}

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
              className="button-dominant mt-3 py-2 px-3 fullwidth"
              type="submit"
            >
              Submit
            </Button>
            <p className="text-center mt-4">
              Don't have an account ? Click{" "}
              <span
                className="fw-bold cursor-pointer"
                onClick={() => {
                  setShowSignin(false);
                  setShowSignup(true);
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

export default SignIn;
