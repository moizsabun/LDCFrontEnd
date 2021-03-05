import React , {useContext}from 'react'
import {  Nav,Navbar,NavDropdown,Form , Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import {Button as MuiButton} from '@material-ui/core';
import { Link } from "react-router-dom";
import isAuthContext from  "../AppContext";
export default function Header() {
  const isAppAuth = useContext(isAuthContext)
  console.log(isAppAuth);
    return (
        <Navbar collapseOnSelect bg="dark" variant="dark"  expand="lg"  >
        <Navbar.Brand href="#home">LDC Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Master data" id="basic-nav-dropdown" >
              <LinkContainer to="/Pages/Masterdata">
              <NavDropdown.Item>Add Master Data</NavDropdown.Item>
              </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to = "/Pages/MasterdataArchive">
           
              <NavDropdown.Item >Master Data Archive</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            
           
            <NavDropdown title="Load Shedding" id="basic-nav-dropdown">
            <LinkContainer to="/Pages/LoadShedding">
            <NavDropdown.Item >Add Load Shedding</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/Pages/LoadSheddingArchive">
            <NavDropdown.Item>Load Shedding Archive</NavDropdown.Item>
            </LinkContainer>
            </NavDropdown>
          </Nav>
          <Nav className="justify-content-end">
          <Nav.Item>
          <MuiButton style={{color: "white"}} component={Link} to = "/"   onClick ={ ()=> {  localStorage.clear("Token"); isAppAuth[1](false);}
        } >Logout</MuiButton>
          </Nav.Item>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
        
      </Navbar>
    )
}
