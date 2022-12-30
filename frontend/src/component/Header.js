import React from "react";
import {
  Button,
  Navbar,
  Nav,
  Form,
  Container,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import "../my.css";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand >
            Computer Components
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>
                    Home
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/store">
                <Nav.Link >
                  Store
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item >
                      Profil
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    
                    onClick={logoutHandler}
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/Login">
                  <Nav.Link href="#action2">
                     Log In
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/cart">
              <Nav.Link href="#action2">
                Cart
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/about">
                <Nav.Link >
                   About
                </Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.isAdmin && (
                <NavDropdown className="nav-color" title="Admin" id="username">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item >
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>
                      Orders{" "}
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
