import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container, ProgressBar, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { subjectsDataSurat } from '../data/subjectsData'
import { subjectsDataDoa } from '../data/subjectsData'
import { subjectsDataDalil } from '../data/subjectsData'
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
    const [suratCount, setSuratCount] = useState([])
    const [doaCount, setDoaCount] = useState([])
    const [dalilCount, setDalilCount] = useState([])

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || successExtraSubject) {
                dispatch({ type: USER_ADD_EXTRA_SUBJECT_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setTotalProgressCount(
                    user.subjectsSurat.length + 
                    user.subjectsDoa.length +
                    user.subjectsDalil.length
                )
                setSuratCount(user.subjectsSurat.length)
                setDoaCount(user.subjectsDoa.length)
                setDalilCount(user.subjectsDalil.length)
            }
        }
    }, [dispatch, userInfo, user, successExtraSubject, history])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            if (param === 'surat') {
                setTotalProgress(user.subjectsSurat)
            } else if (param === 'doa') {
                setTotalProgress(user.subjectsDoa)
            } else if (param === 'dalil') {
                setTotalProgress(user.subjectsDalil)
            }
        }
        
    }

    const clickHandler = (e) => {
        if (!totalProgress.includes(e.target.id)) {
            dispatch(addUserExtraSubject(
                user._id, 
                {
                    type: active,
                    subjects: [...totalProgress, e.target.id]
                }
            ))
            setTotalProgress([...totalProgress, e.target.id])
        } else {
            dispatch(addUserExtraSubject(
                user._id, 
                {
                    type: active,
                    subjects: totalProgress.filter((target)=>(target !== e.target.id))
                }
            ))
            setTotalProgress(totalProgress.filter((target)=>(target !== e.target.id)))
        }
    }

    const finishButtonHandler = () => {
        let subjects
        if (active === 'surat') {
            subjects = subjectsDataSurat.map(subject => subject.name)
        } else if (active === 'doa') {
            subjects = subjectsDataDoa.map(subject => subject.name)
        } else if (active === 'dalil') {
            subjects = subjectsDataDalil.map(subject => subject.name)
        } 

        dispatch(addUserExtraSubject(
            user._id, 
            {
                type: active,
                subjects
            }
        ))

        setTotalProgress(subjects)
    }

    const resetButtonHandler = () => {
        dispatch(addUserExtraSubject(
            user._id, 
            {
                type: active,
                subjects: []
            }
        ))

        setTotalProgress([])
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
                        Surat pilihan <i className={active === 'surat' ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
                        <Row>
                            <Col>
                                <ProgressBar
                                    variant={suratCount/27*100 >= 70 ? 'success' : suratCount/27*100 >= 30 ? 'warning' : 'secondary'} 
                                    now={suratCount/27*100} 
                                    label={`${(suratCount/27*100).toFixed(2)}%`}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {active === 'surat' &&
                <>
                    <Row className='pb-2'>
                        <Col>
                            <Row className='ml-auto'>
                                <Button variant='outline-secondary' onClick={resetButtonHandler} size='sm' className='mr-2'>Reset</Button>
                                <Button variant='success' size='sm' onClick={finishButtonHandler} className='mr-2'>Hafal seluruh materi</Button>
                                {loading && <Loader size='sm' />}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {subjectsDataSurat.map(subject => {
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
                </>
                }

                <Row className='py-2 progress-title' onClick={activeHandler('doa')}>
                    <Col>
                        Doa <i className={active === 'doa' ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
                        <Row>
                            <Col>
                                <ProgressBar
                                    variant={doaCount/28*100 >= 70 ? 'success' : doaCount/28*100 >= 30 ? 'warning' : 'secondary'} 
                                    now={doaCount/28*100} 
                                    label={`${(doaCount/28*100).toFixed(2)}%`}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {active === 'doa' &&
                <>
                    <Row className='pb-2'>
                        <Col>
                            <Row className='ml-auto'>
                                <Button variant='outline-secondary' onClick={resetButtonHandler} size='sm' className='mr-2'>Reset</Button>
                                <Button variant='success' size='sm' onClick={finishButtonHandler} className='mr-2'>Hafal seluruh materi</Button>
                                {loading && <Loader size='sm' />}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {subjectsDataDoa.map(subject => {
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
                </>
                }
                
                <Row className='py-2 progress-title' onClick={activeHandler('dalil')}>
                    <Col>
                        Dalil <i className={active === 'dalil' ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
                        <Row>
                            <Col>
                                <ProgressBar
                                    variant={dalilCount/19*100 >= 70 ? 'success' : dalilCount/19*100 >= 30 ? 'warning' : 'secondary'} 
                                    now={dalilCount/19*100} 
                                    label={`${(dalilCount/19*100).toFixed(2)}%`}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {active === 'dalil' &&
                <>
                    <Row className='pb-2'>
                        <Col>
                            <Row className='ml-auto'>
                                <Button variant='outline-secondary' onClick={resetButtonHandler} size='sm' className='mr-2'>Reset</Button>
                                <Button variant='success' size='sm' onClick={finishButtonHandler} className='mr-2'>Hafal seluruh materi</Button>
                                {loading && <Loader size='sm' />}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {subjectsDataDalil.map(subject => {
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
                </>
                }
                </>
            )}
        </Container>
    )
}

export default SubjectsMemoryScreen