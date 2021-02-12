import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SubjectsMainInfo from './SubjectsMainInfo'
import SubjectsExtraInfo from './SubjectsExtraInfo'
import SubjectsMemoryInfo from './SubjectsMemoryInfo'
import ChartUserSubject from '../components/ChartUserSubject'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers } from '../actions/userActions'
import { USER_LIST_ACTIVEONLY_ON } from '../constans/userConstans'

const SubjectsInfoScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector((state) => state.userList)
    const { loading, error, users, klp } = userList

    const userListActiveOnly = useSelector((state) => state.userListActiveOnly)
    const { activeOnly } = userListActiveOnly

    const [focus, setFocus] = useState('main')

    const [mainTotalProgressCount, setMainTotalProgressCount] = useState(0)
    const [extraTotalProgressCount, setExtraTotalProgressCount] = useState(0)
    const [memoryTotalProgressCount, setMemoryTotalProgressCount] = useState(0)

    const [searchKlp, setSearchKlp] = useState(klp)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (!users || !activeOnly) {
                dispatch({ type: USER_LIST_ACTIVEONLY_ON })
                dispatch(listUsers(searchKlp))
            } else {
                let mainTotal = 0
                let extraTotal = 0
                let memoryTotal = 0

                users.forEach(user => {
                    if (user.isActive) {
                        user.subjects.forEach( userSubject => {
                            mainTotal += userSubject.poinCompleted
                        })
                        
                        extraTotal += user.subjectsExtra.length
                        
                        memoryTotal += (user.subjectsSurat.length + user.subjectsDoa.length + user.subjectsDalil.length)
                    }
                })

                setMainTotalProgressCount(mainTotal/(2208*users.length+0.00001)*100)
                setExtraTotalProgressCount(extraTotal/(14*users.length+0.00001)*100)
                setMemoryTotalProgressCount(memoryTotal/(74*users.length+0.00001)*100)

                setSearchKlp(klp)
            }
        } else {
            history.push('/login')
        }
    }, [history, userInfo, dispatch, users, searchKlp, klp, activeOnly])

    const searchKlpHandler = (e) => {
        dispatch(listUsers(e.target.value))
        setSearchKlp(e.target.value)
    }

    return (
        <Router>
            <h1 style={{textAlign:'center'}}>SUBJECTS MAP</h1>
            <Card className='m-auto demon-card' style={{ width: '14rem' }} />

            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : activeOnly && (
                <>
                <Container>
                    <Row>
                        <Col xs={5} sm={4} md={3} xl={2}>
                            <Form>
                                <Form.Group controlId='klp'>
                                    <Form.Control
                                        required
                                        as='select'
                                        value={searchKlp}
                                        onChange={searchKlpHandler}
                                        custom
                                    >
                                        <option value=''>All Klp</option>
                                        <option value='mrb'>Marbar</option>
                                        <option value='mrs'>Marsel</option>
                                        <option value='mru'>Marut</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                
                <Row className='justify-content-center py-3'>
                    <Col as={Link} to='/admin/subjects/main' xs={3} onClick={() => setFocus('main')} className={focus==='main' ? 'chart-subject-focused' : 'chart-subject'}>
                        <ChartUserSubject title='Main Subjects' data={[mainTotalProgressCount.toFixed(2), (100.00-mainTotalProgressCount).toFixed(2)]} />
                    </Col>
                    <Col as={Link} to='/admin/subjects/extra' xs={3} onClick={() => setFocus('extra')} className={focus==='extra' ? 'chart-subject-focused' : 'chart-subject'}>
                        <ChartUserSubject title='Extra Subjects' data={[extraTotalProgressCount.toFixed(2), (100.00-extraTotalProgressCount).toFixed(2)]} />
                    </Col>
                    <Col as={Link} to='/admin/subjects/memory' xs={3} onClick={() => setFocus('memory')} className={focus==='memory' ? 'chart-subject-focused' : 'chart-subject'}>
                        <ChartUserSubject title='Memory Subjects' data={[memoryTotalProgressCount.toFixed(2), (100.00-memoryTotalProgressCount).toFixed(2)]} />
                    </Col>
                </Row>
                </>
            )}

            <Route path='/admin/subjects/main' component={SubjectsMainInfo} exact/>
            <Route path='/admin/subjects/extra' component={SubjectsExtraInfo} exact/>
            <Route path='/admin/subjects/memory' component={SubjectsMemoryInfo} exact/>
            <Route path='/admin/subjects/' component={SubjectsMainInfo} exact />
        </Router>
    )
}

export default SubjectsInfoScreen