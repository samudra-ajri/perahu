import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { getUserDetails, updateUser } from '../actions/userActions'
import ChartUserSubject from '../components/ChartUserSubject'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { USER_LIST_RESET, USER_UPDATE_RESET } from '../constans/userConstans'
import SubjectExtraUser from './SubjectExtraUser'
import SubjectMainUser from './SubjectMainUser'
import SubjectMemoryUser from './SubjectMemoryUser'

const UserInfoScreen = ({ match, history }) => {
    const userId = match.params.id

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    const [isAdmin, setIsAdmin] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const [focus, setFocus] = useState('main')

    const [mainTotalProgressCount, setMainTotalProgressCount] = useState(0)
    const [extraTotalProgressCount, setExtraTotalProgressCount] = useState(0)
    const [memoryTotalProgressCount, setMemoryTotalProgressCount] = useState(0)

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

                const mainTotal = user.subjects.reduce((acc, subject) => acc + subject.completed.length, 0)

                setMainTotalProgressCount(mainTotal/2208*100)
                setExtraTotalProgressCount(user.subjectsExtra.length/14*100)
                setMemoryTotalProgressCount(
                    (user.subjectsSurat.length + user.subjectsDoa.length + user.subjectsDalil.length)/74*100
                )
            }
        }
    }, [dispatch, history, userInfo, userId, user, successUpdate])

    const updateActive = () => {
        if (window.confirm('Are you sure?')) {
            const updatedUser = user
            updatedUser.isActive = !isActive

            dispatch(updateUser(updatedUser))
            setIsActive(!isActive)
        }
        
    }

    const updateAdmin = () => {
        if (window.confirm('Are you sure?')) {
            const updatedUser = user
            updatedUser.isAdmin = !isAdmin

            dispatch(updateUser(updatedUser))
            setIsAdmin(!isAdmin)
        }
    }

    return (
        <Route>
            <Link to='/admin/userlist' className='btn btn-light mx-3 mt-3 mb-1'>
                <i className='fas fa-arrow-left'></i> Back
            </Link>

            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <h1 style={{ textAlign:'center' }}>{user.name}</h1>
                    <Card className='m-auto demon-card' style={{ width: '15rem' }} />

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
                                            <Form.Group controlId='isAdmin'>
                                            <Form.Check
                                                type='checkbox'
                                                label='Admin'
                                                checked={isAdmin}
                                                onChange={updateAdmin}
                                                custom
                                            />
                                            </Form.Group>
                                        </Col>
                                        <Col xs='auto'>
                                            <Form.Group controlId='isActive'>
                                            <Form.Check
                                                type='checkbox'
                                                label='Active as Generus'
                                                checked={isActive}
                                                onChange={updateActive}
                                                custom
                                            />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </>
                        )
                    )}

                    <Row className='justify-content-center py-3'>
                        <Col as={Link} to={`/admin/user/${userId}/info/main`} xs={3} onClick={() => setFocus('main')} className={focus==='main' ? 'chart-subject-focused' : 'chart-subject'}>
                            <ChartUserSubject title='Main Subjects' data={[mainTotalProgressCount.toFixed(2), (100.00-mainTotalProgressCount).toFixed(2)]} />
                        </Col>
                        <Col as={Link} to={`/admin/user/${userId}/info/extra`} xs={3} onClick={() => setFocus('extra')} className={focus==='extra' ? 'chart-subject-focused' : 'chart-subject'}>
                            <ChartUserSubject title='Extra Subjects' data={[extraTotalProgressCount.toFixed(2), (100.00-extraTotalProgressCount).toFixed(2)]} />
                        </Col>
                        <Col as={Link} to={`/admin/user/${userId}/info/memory`} xs={3} onClick={() => setFocus('memory')} className={focus==='memory' ? 'chart-subject-focused' : 'chart-subject'}>
                            <ChartUserSubject title='Memory Subjects' data={[memoryTotalProgressCount.toFixed(2), (100.00-memoryTotalProgressCount).toFixed(2)]} />
                        </Col>
                    </Row>
                </> 
            )}

            <Route path='/admin/user/:id/info/main' component={SubjectMainUser} exact/>
            <Route path='/admin/user/:id/info/extra' component={SubjectExtraUser} exact/>
            <Route path='/admin/user/:id/info/memory' component={SubjectMemoryUser} exact/>
            <Route path='/admin/user/:id/info' component={SubjectMainUser} exact />
        </Route>
    )
}

export default UserInfoScreen