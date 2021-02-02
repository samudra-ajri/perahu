import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { subjectsDataMain } from '../data/subjectsData'
import { addUserSubject, getUserDetails } from '../actions/userActions'
import { USER_ADD_SUBJECT_RESET } from '../constans/userConstans'
import ProgressTitle from '../components/ProgressTitle'
import ProgressSubtitle from '../components/ProgressSubtitle'
import ProgressButtons from '../components/ProgressButtons'
import SubjectMainGrid from '../components/SubjectMainGrid'

const SubjectsMainScreen = ({ history }) => {
    const dispatch = useDispatch()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [active, setActive] = useState('')
    const [subjectProgress, setSubjectProgress] = useState([])
    const [totalProgressCount, setTotalProgressCount] = useState(0)
    const [totalProgress, setTotalProgress] = useState([])

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
                    
                    setTotalProgress(progress)
                }
                
                countProgress()

                const totalProgress = user.subjects.reduce((acc, subject) => acc + subject.completed.length, 0)
                setTotalProgressCount((totalProgress/2208*100).toFixed(2))
            }
        }
    }, [dispatch, userInfo, user, successUserSubject, history])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            setSubjectProgress([])

            let found = false
            let i = 0
            while (i < user.subjects.length && found === false) {
                if (user.subjects[i].name === param) {
                    setSubjectProgress(user.subjects[i].completed)
                    found = true
                }
                i++
            }

        }
    }

    const clickHandler = (e) => {
        if (!subjectProgress.includes(e.target.id)) {
            dispatch(addUserSubject(user._id, {
                name: active,
                completed: [...subjectProgress, e.target.id]
            }))

            setSubjectProgress([...subjectProgress, e.target.id])
        } else {
            dispatch(addUserSubject(user._id, {
                name: active,
                completed: subjectProgress.filter((target)=>(target !== e.target.id))
            }))

            setSubjectProgress(subjectProgress.filter((target)=>(target !== e.target.id)))
        }
    }

    const finishButtonHandler = target => () => {
        dispatch(addUserSubject(user._id, {
            name: active,
            completed: Array.from({length: target}, (_, i) => i + 1)
        }))
        setSubjectProgress(Array.from({length: target}, (_, i) => String(i + 1)))
    }

    const resetButtonHandler = () => {
        dispatch(addUserSubject(user._id, {
            name: active,
            completed: []
        }))
        setSubjectProgress([])
    }

    return (
        <Container className='px-3'>
            <h1 style={{textAlign:'center'}}>MATERI POKOK</h1>
            <Card border="light" style={{ width: '13rem', margin:'auto' }} />
            
            {errorUserSubject && <Message variant='danger'>{errorUserSubject}</Message>}
            { error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                <Row>
                    <Col>
                        <ProgressTitle title='TOTAL MATERI POKOK' count={totalProgressCount}/>
                    </Col>
                </Row>
                {subjectsDataMain.map((subject, i) => {
                    return(
                        <div key={subject.name}>
                            <Row 
                                className='py-2 progress-title' 
                                onClick={activeHandler(subject.name)}
                            >
                                <Col>
                                    {totalProgress.length !== 0 &&
                                        <ProgressSubtitle 
                                            title={subject.name} 
                                            count={totalProgress[i]} 
                                            active={active} 
                                        />
                                    }
                                </Col>
                            </Row>
                            {active === subject.name && 
                                <>
                                <Row className='pb-2'>
                                    <Col>
                                        <ProgressButtons 
                                            finishAction={finishButtonHandler(subject.target)} 
                                            resetActoin={resetButtonHandler} 
                                            loading={loading}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <SubjectMainGrid 
                                            data={Array.from(Array(subject.target).keys())} 
                                            progress={subjectProgress} 
                                            action={clickHandler}
                                        />
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