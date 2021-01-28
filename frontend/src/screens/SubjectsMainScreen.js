import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container, ProgressBar, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { subjectsDataMain } from '../data/subjectsData'
import { addUserSubject, getUserDetails } from '../actions/userActions'
import { USER_ADD_SUBJECT_RESET } from '../constans/userConstans'
import Loader from '../components/Loader'

const SubjectsMainScreen = ({ history }) => {
    const dispatch = useDispatch()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [active, setActive] = useState('')
    const [userProgress, setUserProgress] = useState([])
    const [userTotalProgress, setUserTotalProgress] = useState(0)
    const [subjectsProgress, setSubjectProgress] = useState([])

    const userSubjectAdd = useSelector((state) => state.userSubjectAdd)
    const { success: successUserSubject, error: errorUserSubject } = userSubjectAdd

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || successUserSubject) {
                dispatch({ type: USER_ADD_SUBJECT_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                const countProgress = () => {
                    let progress = []
                    
                    subjectsDataMain.forEach(subject=> {
                        let foundIdx = -1
                        let i = 0
                        while (i < user.subjects.length && foundIdx === -1) {
                            if (subject.name === user.subjects[i].name) {
                                foundIdx = i
                            }
                            i++
                        }
                        
                        foundIdx !== -1
                        ? progress.push((user.subjects[foundIdx].poinCompleted/subject.target*100).toFixed(2))
                        : progress.push(0)
                    })
                    
                    setSubjectProgress(progress)
                }
                
                countProgress()

                const totalProgress = user.subjects.reduce((acc, subject) => acc + subject.completed.length, 0)
                setUserTotalProgress(totalProgress)
            }
        }
    }, [dispatch, userInfo, user, successUserSubject, history])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            setUserProgress([])

            let found = false
            let i = 0
            while (i < user.subjects.length && found === false) {
                if (user.subjects[i].name === param) {
                    setUserProgress(user.subjects[i].completed)
                    found = true
                }
                i++
            }

        }
    }

    const clickHandler = (e) => {
        !userProgress.includes(e.target.id) 
        ? setUserProgress([...userProgress, e.target.id])
        : setUserProgress(userProgress.filter((target)=>(target !== e.target.id)))
        
        if (!userProgress.includes(e.target.id)) {
            dispatch(addUserSubject(user._id, {
                name: active,
                completed: [...userProgress, e.target.id]
            }))

            setUserProgress([...userProgress, e.target.id])
        } else {
            dispatch(addUserSubject(user._id, {
                name: active,
                completed: userProgress.filter((target)=>(target !== e.target.id))
            }))

            setUserProgress(userProgress.filter((target)=>(target !== e.target.id)))
        }
    }

    const finishButtonHandler = target => () => {
        dispatch(addUserSubject(user._id, {
            name: active,
            completed: Array.from({length: target}, (_, i) => i + 1)
        }))
        setUserProgress(Array.from({length: target}, (_, i) => String(i + 1)))
    }

    const resetButtonHandler = () => {
        dispatch(addUserSubject(user._id, {
            name: active,
            completed: []
        }))
        setUserProgress([])
    }

    return (
        <Container className='px-3'>
            <h1 style={{textAlign:'center'}}>MATERI POKOK</h1>
            <Card border="light" style={{ width: '13rem', margin:'auto' }} />
            { error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                <Row>
                    <Col>
                    <strong>TOTAL MATERI POKOK</strong>
                        <Row>
                            <Col>
                                {subjectsProgress.length !== 0 && 
                                    <ProgressBar
                                        variant={userTotalProgress/2208*100 >= 70 ? 'success' : userTotalProgress/2208*100 >= 30 ? 'warning' : 'secondary'} 
                                        now={userTotalProgress/2208*100} 
                                        label={`${(userTotalProgress/2208*100).toFixed(2)}%`}
                                    />
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />
                {subjectsDataMain.map((subject, i) => {
                    return(
                        <div key={subject.name}>
                            
                            <Row 
                                className='py-2 progress-title' 
                                onClick={activeHandler(subject.name)}
                            >
                                <Col>
                                {subject.name}
                                    <Row>
                                        <Col>
                                            {subjectsProgress.length !== 0 && 
                                                <ProgressBar
                                                    variant={subjectsProgress[i] >= 70 ? 'success' : subjectsProgress[i] >= 30 ? 'warning' : 'secondary'} 
                                                    now={subjectsProgress[i]} 
                                                    label={`${subjectsProgress[i]}%`}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {errorUserSubject && <Message variant='danger'>{errorUserSubject}</Message>}
                            {active === subject.name && 
                                <>
                                <Row className='pb-2'>
                                    <Col>
                                        {loading 
                                        ? <Loader size='sm' /> 
                                        : <>
                                            <Button variant='outline-secondary' size='sm' onClick={resetButtonHandler} className='mr-2'>Reset</Button>
                                            <Button variant='success' size='sm' onClick={finishButtonHandler(subject.target)} className='px-5'>Hatam</Button>
                                        </>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {Array.from(Array(subject.target).keys()).map(target => {
                                            return (
                                                <Button
                                                    id={target+1}
                                                    className='unrounded-button'
                                                    key={target} 
                                                    variant={userProgress.includes(String(target+1)) ? 'success' : 'outline-success'}
                                                    size='sm'
                                                    style={{width:'3rem'}}
                                                    onClick={clickHandler}
                                                >{target+1}</Button>
                                            )
                                        })}
                                    </Col>
                                </Row>
                                </>
                            }
                        </div>
                    )
                })}
                </>
            )}
        </Container>
    )
}

export default SubjectsMainScreen