import React, { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Nav } from 'react-bootstrap'
import { sidebarData } from '../data/sidebarData'
import { useDispatch, useSelector } from 'react-redux'
import { focusSidebar } from '../actions/sidebarActions'

const Sidebar = () => {
    const dispatch = useDispatch()

    const sidebarFocus = useSelector((state) => state.sidebarFocus)
    const { active, open } = sidebarFocus

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [activeBar, setActiveBar] = useState(active)
    const [openBar, setOpenBar] = useState(open)

    const MainClickHandler = param => () => {
        setActiveBar(param.name) 
        
        if (!param.sub) {
            setOpenBar(param.name)
            dispatch(focusSidebar(param.name, param.name))
        }

    }

    const SubClickHandler = param => () => {
        setOpenBar(param)

        dispatch(focusSidebar(activeBar, param))
    }

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
                                    onClick={MainClickHandler(main)}
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
                                                onClick={SubClickHandler(sub.name)}
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
