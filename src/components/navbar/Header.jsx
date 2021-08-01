import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./header.css";

import LogoIcon from "../../assets/Iconlogo.svg";
import LoginBtn from "../../assets/LoginButton.svg";
import RegisterBtn from "../../assets/ButtonRegister.svg";
import CartIcon from "../../assets/cart.svg";
import AddProductIcon from "../../assets/AddProduct.svg";
import LogoutIcon from "../../assets/logout.svg";
import ProfileIcon from "../../assets/userIcon.svg";
import AvatarThumbnail from "../../assets/Profile.png";

import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import { setAuthToken } from "../../config/api";
import SignIn from "../modals/SignIn";
import Signup from "../modals/Signup";

const Header = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  // console.log(state.user);

  let avatar = "";
  if (state.isLogin === true) {
    if (state.user.photo === null) {
      avatar = AvatarThumbnail;
    } else {
      avatar = state.user.photo;
    }
  }

  const handleSignout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
    setAuthToken();
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="shadow mb-4"
      >
        <Container>
          <Navbar.Brand href="#home">
            <Link
              to={
                state.isLogin && state.user.role_id === 1 ? "/dashboard" : "/"
              }
            >
              <img src={LogoIcon} alt=".." />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {state.isLogin && (
                <>
                  {state.user.role_id === 2 ? (
                    <img
                      src={CartIcon}
                      alt="cart"
                      onClick={() => history.push("/cart")}
                      className="cart"
                      width="30px"
                    />
                  ) : null}
                  <NavDropdown
                    title={<img className="avatar" src={avatar} alt="..." />}
                    id="nav-dropdown"
                  >
                    {state.user.role_id === 2 ? (
                      <NavDropdown.Item
                        onClick={() => history.push("/profile")}
                      >
                        <div className="d-flex">
                          <img
                            src={ProfileIcon}
                            alt="..."
                            style={{
                              width: "20px",
                              height: "auto",
                              marginRight: "1em",
                            }}
                          />
                          Profile
                        </div>
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item
                        onClick={() => history.push("/add-product")}
                      >
                        <div className="d-flex">
                          <img
                            src={AddProductIcon}
                            alt="..."
                            style={{
                              width: "20px",
                              height: "auto",
                              marginRight: "1em",
                            }}
                          />
                          Add Product
                        </div>
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={handleSignout} eventKey="4.4">
                      <div className="d-flex">
                        <img
                          src={LogoutIcon}
                          alt="..."
                          style={{
                            width: "20px",
                            height: "auto",
                            marginRight: "1em",
                          }}
                        />
                        Logout
                      </div>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {!state.isLogin && (
                <>
                  <Nav.Link href="#login" onClick={() => setShowSignin(true)}>
                    <img src={LoginBtn} alt="login" />
                  </Nav.Link>
                  <Nav.Link
                    eventKey={2}
                    href="#register"
                    onClick={() => setShowSignup(true)}
                  >
                    <img src={RegisterBtn} alt="register" />
                  </Nav.Link>
                  <SignIn
                    showSignin={showSignin}
                    setShowSignin={setShowSignin}
                    dispatch={dispatch}
                  />
                  <Signup
                    showSignup={showSignup}
                    setShowSignup={setShowSignup}
                  />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
