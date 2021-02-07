import React, { useEffect, useState } from 'react'
import { Table, Button, Card, Row, Col, Form, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { USER_LIST_RESET, USER_UPDATE_RESET } from '../constans/userConstans'

const UserInfoScreen = ({ match, history }) => {
    const userId = match.params.id

    const [isActive, setIsActive] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (!userInfo && !userInfo.isAdmin) {
            history.push('/login')
        } else {
            if (!user.name || user._id !== userId || successUpdate) {
                dispatch({ type: USER_LIST_RESET })
                dispatch({ type: USER_UPDATE_RESET })
                dispatch(getUserDetails(userId))
            } else {
                setIsActive(user.isActive)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, history, user])

    const updateActive = (e) => {
        e.preventDefault()

        const updatedUser = user
        updatedUser.isActive = !isActive

        dispatch(updateUser(updatedUser))
        setIsActive(!isActive)
    }

    const updateAdmin = () => {
        const updatedUser = user
        updatedUser.isAdmin = !isAdmin

        dispatch(updateUser(updatedUser))
        setIsAdmin(!isAdmin)
    }

    return (
        <>
            <Container>
                <Link to='/admin/userlist' className='btn btn-light mx-3 mt-3 mb-1'>
                    <i className='fas fa-arrow-left'></i> Back
                </Link>
            </Container>

            <h1 style={{ textAlign:'center' }}>{user.name}</h1>
                        <Card className='m-auto demon-card' style={{ width: '13rem' }} />

            {loadingUpdate ? (
                <div style={{ textAlign:'center', marginTop:'-20px' }}>updating...</div>
            ) : (
                errorUpdate ? (
                    <Message variant='danger'>{errorUpdate}</Message>
                ) : (
                    <>
                        
                        <Form style={{ marginTop:'-20px' }}>
                            <Row className='justify-content-center'>
                                <Col xs={2} md={2} lg={1}>
                                <Form.Group controlId='isMuballigh'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Active'
                                        value={isActive}
                                        checked={isActive}
                                        onChange={updateActive}
                                    />
                                    </Form.Group>
                                </Col>
                                <Col xs='auto'>
                                <Form.Group controlId='isMuballigh'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Admin'
                                        value={isAdmin}
                                        checked={isAdmin}
                                        onChange={updateAdmin}
                                    />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </>
                )
            )}
            

            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default UserInfoScreen