import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProgressSubtitle from '../components/ProgressSubtitle'
import SubjectMainGrid from '../components/SubjectMainGrid'
import { subjectsDataMain } from '../data/subjectsData'

const SubjectMainUser = ({ match, history }) => {
    const userId = match.params.id

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const [active, setActive] = useState('')

    const [subjectsCount, setSubjectsCount] = useState({})
    const [subjectProgress, setSubjectProgress] = useState([])

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (!user.name) {
                dispatch(getUserDetails(userId))
            } else {
                const subjectsCount = {}

                subjectsDataMain.forEach(subject => {
                    subjectsCount[subject.name] = 0
                })

                subjectsDataMain.forEach(subject => {
                    user.subjects.some(userSubject => {
                        if (subject.name === userSubject.name) {
                            subjectsCount[subject.name] = (userSubject.poinCompleted/subject.target*100).toFixed(2)
                        }
                        return subject.name === userSubject.name
                    })
                })

                setSubjectsCount(subjectsCount)
            }
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, userId, user])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            setSubjectProgress([])

            user.subjects.some(userSubject => {
                if (userSubject.name === param) {
                    setSubjectProgress(userSubject.completed)
                }
                return userSubject.name === param
            })
        }
    }

    return (
        <Container>
            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    {subjectsDataMain.map(subject => {
                        return (
                            <Fragment key={subject.name}>
                                <Row 
                                    className='py-2 progress-title' 
                                    onClick={activeHandler(subject.name)}
                                >
                                    <Col>
                                        <ProgressSubtitle 
                                            title={subject.name} 
                                            count={subjectsCount[subject.name] || 0} 
                                            active={active} 
                                        />
                                    </Col>
                                </Row>
                                {active === subject.name && 
                                    <Row>
                                        <Col>
                                            <SubjectMainGrid 
                                                data={Array.from(Array(subject.target).keys())} 
                                                progress={subjectProgress} 
                                                disabled={true}
                                            />
                                        </Col>
                                    </Row>
                                }
                            </Fragment>
                        )
                    })}
                </>
            )}
        </Container>
    )
}

export default SubjectMainUser