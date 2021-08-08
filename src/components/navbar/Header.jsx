import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  DropdownButton,
  Dropdown,
  NavLink,
  NavItem,
} from "react-bootstrap";
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
    dispatch({
      type: "RESET_CART",
    });
    setAuthToken();
  };

  return (
    <div>
      <Navbar bg="light" variant="light" className="shadow mb-4 px-5">
        <Navbar.Brand href="#home">
          <Link
            to={state.isLogin && state.user.role_id === 1 ? "/dashboard" : "/"}
          >
            <img src={LogoIcon} alt=".." />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto"></Nav>

        <Nav>
          {state.isLogin && (
            <>
              {state.user.role_id === 2 ? (
                <>
                  {state.cart.length > 0 ? (
                    <div className="cartCount">
                      <p>{state.cart.length}</p>
                    </div>
                  ) : null}
                  <img
                    src={CartIcon}
                    alt="cart"
                    onClick={() => history.push("/cart")}
                    className="cart"
                    width="35px"
                  />
                </>
              ) : null}

              <Dropdown as={NavItem} className="dropdown-menu-lg-end">
                <Dropdown.Toggle as={NavLink}>
                  <img className="avatar" src={avatar} alt="..." />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdownCustom">
                  {state.user.role_id === 2 ? (
                    <Dropdown.Item onClick={() => history.push("/profile")}>
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
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item onClick={() => history.push("/add-product")}>
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
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />

                  <Dropdown.Item onClick={handleSignout} eventKey="4.4">
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
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
          {!state.isLogin && (
            <Nav>
              <Link to="#login">
                <Nav.Link href="#login" onClick={() => setShowSignin(true)}>
                  <img src={LoginBtn} alt="login" />
                </Nav.Link>
              </Link>
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
                setShowSignup={setShowSignup}
                dispatch={dispatch}
              />
              <Signup
                showSignup={showSignup}
                setShowSignup={setShowSignup}
                setShowSignin={setShowSignin}
              />
            </Nav>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
