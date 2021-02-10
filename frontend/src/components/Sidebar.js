import React, { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Nav } from 'react-bootstrap'
import { sidebarData } from '../data/sidebarData'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const [activeBar, setActiveBar] = useState('')
    const [openBar, setOpenBar] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <Col xs={5} sm={4} md={3} lg={2}>
            <div className='sidebar'>
                {sidebarData.map((main) => {
                    return (
                        main.name === 'Admin' && !userInfo.isAdmin ? (
                            <div></div>
                        ) : (
                            <Col key={main.name}>
                                <Row 
                                    as={LinkContainer} 
                                    to={main.path} 
                                    onClick={() => {setActiveBar(main.name); if(!main.sub) setOpenBar(main.name)}}
                                    className={openBar === main.name ? 'clicked' : 'sidebar-menu'} 
                                >
                                    <Nav.Link>
                                        <i className={`sidebar-icon ${main.icon}`}></i>
                                        {main.name}
                                    </Nav.Link>
                                </Row>

                                {main.sub && activeBar === main.name && (
                                    main.sub.map(sub => {
                                        return (
                                            <Row 
                                                className={openBar === sub.name ? 'clicked sidebar-submenu' : 'sidebar-submenu'} 
                                                key={sub.name}
                                                as={LinkContainer} 
                                                to={sub.path} 
                                                onClick={() => {setOpenBar(sub.name)}}
                                                >
                                                <Nav.Link>
                                                    <i className={`sidebar-icon ${sub.icon}`}></i>{sub.name}
                                                </Nav.Link>
                                            </Row>
                                        )
                                    })
                                )}
                            </Col>
                        )
                    )
                })}
            </div>
        </Col>
    )
}

export default Sidebar
