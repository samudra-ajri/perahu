import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ChartUserSubject from '../components/ChartUserSubject'
import { getUserDetails, updateUser } from '../actions/userActions'
import { Link } from 'react-router-dom'
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
    }, [dispatch, history, userInfo, userId, user, successUpdate])

    const updateActive = () => {
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
            <Link to='/admin/userlist' className='btn btn-light mx-3 mt-3 mb-1'>
                <i className='fas fa-arrow-left'></i> Back
            </Link>

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
                                <Col xs={3} md={2} lg={1}>
                                <Form.Group controlId='isMuballigh'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Active'
                                        checked={isActive}
                                        onChange={updateActive}
                                        custom
                                    />
                                    </Form.Group>
                                </Col>
                                <Col xs='auto'>
                                <Form.Group controlId='isMuballigh'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Admin'
                                        checked={isAdmin}
                                        onChange={updateAdmin}
                                        custom
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
                    <Row className='justify-content-center py-3'>
                        <Col xs={3}>
                            <ChartUserSubject title='Main Subjects' data={[30,20]} />
                        </Col>
                        <Col xs={3}>
                            <ChartUserSubject title='Extra Subjects' data={[90,25]} />
                        </Col>
                        <Col xs={3}>
                            <ChartUserSubject title='Memory Subjects' data={[55,20]} />
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default UserInfoScreen