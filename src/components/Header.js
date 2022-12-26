import React, { useContext, useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { ThemeContext } from '../GlobalComponents/ThemeProvider';
import { BiSun, BiMoon, BiCart } from 'react-icons/bi';
import { VscAccount } from 'react-icons/vsc';
import { Link, useNavigate } from "@reach/router";
import { useCart } from "react-use-cart";


const Header = () => {
  const { theme, setThemeMode } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(theme);
var isAdmin =window.location.pathname.startsWith("/admin")
  // const navigate = useNavigate();
console.log(window.location.pathname);
console.log(theme);
  useEffect(() => {
    setThemeMode(darkMode);
    console.log(darkMode)
  }, [darkMode]);

  const {
    isEmpty,
    totalItems,
  } = useCart();

  // const logout = () => {
  
  //   navigate("/new-product");
  // };
 

  // const logout=()=>{
  //   navigate("/sign-in");
  // };
  const navBtn=()=>{
    if(isAdmin){
      return(
        <></>
      )
    }
    return(
      <>
       <Link
              to="/cart" 
              className={`${darkMode? 'text-dark-primary': 'text-light-primary'} d-flex align-items-center`} style={{marginRight:"20px",textDecoration:'none'}}>
              <BiCart size="2rem" />
              {!isEmpty && <span style={{ position: 'relative', left: '-21px', top: '-18px' }}>{totalItems}</span>}
              <span style={{ marginLeft: !isEmpty ? '-13px' : 0 }}>&nbsp;Cart</span>
            </Link>
            <Link to="my-account" className={`nav-link ${darkMode? 'text-dark-primary': 'text-light-primary'}`}style={{marginRight:"24px"}}>
              <VscAccount size="1.8rem" />
              &nbsp;My Account
            </Link>
      </>
    )
  }

  return (
    <Navbar collapseOnSelect expand="md"
    variant={darkMode? 'dark':'light'}
    className={darkMode? 'bg-light-black border-bottom': 'bg-light border-bottom'}
      style={{ width: '100%', position: 'fixed', zIndex: 100,boxShadow:"0px 0px 15px grey" }}
    >
      <Container>
        <Link to="/" style={{textDecoration:'none'}}>
          <Navbar.Brand className={darkMode? 'text-dark-primary': 'text-light-primary'}>
            <b style={{color:"darkgreen", fontSize:"30px"}}>Easy Pharmacy</b>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            <Nav.Link
              className={darkMode ? 'text-dark-primary' : 'text-light-primary'}
              onClick={() => setDarkMode(!darkMode)} style={{marginRight:"20px"}}>
              {darkMode ? <BiSun size="1.7rem" /> : <BiMoon size="1.7rem" />}
            </Nav.Link>
          {
            navBtn()
          }
            <Link to="/sign-in" className={`nav-link ${darkMode? 'text-dark-primary': 'text-light-primary'}`}style={{marginRight:"24px"}}>
              <Button variant="outline-success">Logout</Button></Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;