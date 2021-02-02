import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { showSidebar } from '../actions/sidebarActions'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const sidebarShow = useSelector(state => state.sidebarShow)
    const { sidebar } = sidebarShow

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const showSidebarHandler = () => {
        dispatch(showSidebar(!sidebar))
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar sticky='top' bg='primary' variant='dark'>
            <Container fluid>
                {userInfo && (
                    <Navbar.Brand onClick={showSidebarHandler}><i className='fas fa-bars sidebar-button'></i></Navbar.Brand>
                )}
                <LinkContainer to='/'>
                    <Navbar.Brand><strong>Perahu</strong></Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {userInfo ? (
                            <LinkContainer to='/logout' onClick={logoutHandler}>
                                <Nav.Link>Sign Out <i className='fas fa-sign-out-alt'></i></Nav.Link>
                            </LinkContainer>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>Sign In <i className='fas fa-sign-in-alt'></i></Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
