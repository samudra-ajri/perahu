import React, { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <header>
                <Navbar bg='primary' variant='dark'>
                    <Container fluid>
                        <LinkContainer to='#'>
                            <Navbar.Brand onClick={showSidebar}><i className='fas fa-bars'></i></Navbar.Brand>
                        </LinkContainer>

                        <LinkContainer to='/'>
                            <Navbar.Brand>Perahu</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <LinkContainer to='#/cart'>
                                    <Nav.Link>Sign Out</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='#/login'>
                                    <Nav.Link>Sign In</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </header>
    )
}

export default Header
