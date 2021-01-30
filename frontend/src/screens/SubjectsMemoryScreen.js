import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container, ProgressBar, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { subjectsDataMemory } from '../data/subjectsData'
import { addUserExtraSubject, getUserDetails } from '../actions/userActions'
import { USER_ADD_EXTRA_SUBJECT_RESET } from '../constans/userConstans'

const SubjectsMemoryScreen = ({ history }) => {
    const dispatch = useDispatch()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userExtraSubjectAdd = useSelector((state) => state.userExtraSubjectAdd)
    const { success: successExtraSubject, error: errorExtraSubject } = userExtraSubjectAdd

    const [active, setActive] = useState([])
    const [totalProgress, setTotalProgress] = useState([])
    const [totalProgressCount, setTotalProgressCount] = useState([])

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || successExtraSubject) {
                dispatch({ type: USER_ADD_EXTRA_SUBJECT_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setTotalProgress(user.subjectsMemory)
                setTotalProgressCount(user.subjectsMemory.length)
            }
        }
    }, [dispatch, userInfo, user, successExtraSubject, history])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
        }
    }

    const clickHandler = (e) => {
        if (!totalProgress.includes(e.target.id)) {
            dispatch(addUserExtraSubject(
                user._id, 
                {
                    type: 'memory',
                    subjects: [...totalProgress, e.target.id]
                }
            ))

        } else {
            dispatch(addUserExtraSubject(
                user._id, 
                {
                    type: 'memory',
                    subjects: totalProgress.filter((target)=>(target !== e.target.id))
                }
            ))
        }
    }

    const finishButtonHandler = () => {
        dispatch(addUserExtraSubject(
            user._id, 
            {
                type: 'memory',
                subjects: subjectsDataMemory.map(a => a.name)
            }
        ))
    }

    const resetButtonHandler = () => {
        dispatch(addUserExtraSubject(
            user._id, 
            {
                type: 'memory',
                subjects: []
            }
        ))
    }

    return (
        <Container className='px-3'>
            <h1 style={{textAlign:'center'}}>MATERI HAFALAN</h1>
            <Card border="light" style={{ width: '13rem', margin:'auto' }} />

            {errorExtraSubject && <Message variant='danger'>{errorExtraSubject}</Message>}
            { error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                <Row>
                    <Col>
                        <strong>TOTAL MATERI HAFALAN</strong> 
                        <Row>
                            <Col>
                                <ProgressBar
                                    variant={totalProgressCount/74*100 >= 70 ? 'success' : totalProgressCount/74*100 >= 30 ? 'warning' : 'secondary'} 
                                    now={totalProgressCount/74*100} 
                                    label={`${(totalProgressCount/74*100).toFixed(2)}%`}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <hr />
                <Row className='py-2 progress-title' onClick={activeHandler('surat')}>
                    <Col>
                        Surat pilihan
                        <Row>
                            <Col>
                                <ProgressBar
                                    variant={totalProgress.length >= 70 ? 'success' : totalProgress.length >= 30 ? 'warning' : 'secondary'} 
                                    now={totalProgress.length} 
                                    label={`${totalProgress.length}%`}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {active === 'surat' &&
                <Row>
                    <Col>
                        {subjectsDataMemory.filter(subject => subject.subCategory === 'surat').map(subject => {
                            return(
                                <Button
                                    key={subject.name}
                                    id={subject.name}
                                    size='sm'
                                    className='mr-1 mb-1'
                                    variant={totalProgress.includes(subject.name) ? 'success' : 'outline-success'}
                                    onClick={clickHandler}
                                >
                                    {subject.name} 
                                </Button>
                            )
                        })}
                    </Col>
                </Row>
                }

                <Row className='py-2 progress-title' onClick={activeHandler('doa')}>
                    <Col>
                        Doa
                        <Row>
                            <Col>
                                <ProgressBar
                                    variant={totalProgress.length >= 70 ? 'success' : totalProgress.length >= 30 ? 'warning' : 'secondary'} 
                                    now={totalProgress.length} 
                                    label={`${totalProgress.length}%`}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {active === 'doa' &&
                <Row>
                    <Col>
                        {subjectsDataMemory.filter(subject => subject.subCategory === 'doa').map(subject => {
                            return(
                                <Button
                                    key={subject.name}
                                    id={subject.name}
                                    size='sm'
                                    className='mr-1 mb-1'
                                    variant={totalProgress.includes(subject.name) ? 'success' : 'outline-success'}
                                    onClick={clickHandler}
                                >
                                    {subject.name} 
                                </Button>
                            )
                        })}
                    </Col>
                </Row>
                }
                
                <Row className='py-2 progress-title' onClick={activeHandler('dalil')}>
                    <Col>
                        Dalil
                        <Row>
                            <Col>
                                <ProgressBar
                                    variant={totalProgress.length >= 70 ? 'success' : totalProgress.length >= 30 ? 'warning' : 'secondary'} 
                                    now={totalProgress.length} 
                                    label={`${totalProgress.length}%`}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {active === 'dalil' &&
                <Row>
                    <Col>
                        {subjectsDataMemory.filter(subject => subject.subCategory === 'dalil').map(subject => {
                            return(
                                <Button
                                    key={subject.name}
                                    id={subject.name}
                                    size='sm'
                                    className='mr-1 mb-1'
                                    variant={totalProgress.includes(subject.name) ? 'success' : 'outline-success'}
                                    onClick={clickHandler}
                                >
                                    {subject.name} 
                                </Button>
                            )
                        })}
                    </Col>
                </Row>
                }
                </>
            )}
        </Container>
    )
}

export default SubjectsMemoryScreen