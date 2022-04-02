import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Navigation = () => {
  const { user, logout } = useContext(AuthContext)

  const menuBar = user ? (
    <div>
      <Navbar bg="white" variant="light">
        <Navbar.Brand>{user.name}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as="span">
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link to="/statistics">Statistics</Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  ) : (
    <div>
      <Navbar bg="white" variant="light">
        <Nav className="me-auto">
          <Nav.Link as="span">
            <Link to="/login">Login</Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link to="/register">Register</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  )

  return menuBar
}

export default Navigation
