import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import MapSubjectMainGrid from '../components/MapSubjectMainGrid'
import Message from '../components/Message'
import ProgressSubtitle from '../components/ProgressSubtitle'
import { subjectsDataMain } from '../data/subjectsData'

const SubjectsInfoScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const [active, setActive] = useState('')

    const [mainSubjectsCount, setMainSubjectsCount] = useState({})
    const [mainSubjectsProgress, setMainSubjectsProgress] = useState({})

    useEffect(() => {
        if (!userInfo && !userInfo.isAdmin) {
            history.push('/login')
        } else {
            const mainSubjectsCount = {}

            subjectsDataMain.forEach(subject => {
                mainSubjectsCount[subject.name] = 0
            })

            if (!users) {
                dispatch(listUsers())
            } else {
                users.forEach(user => {
                    subjectsDataMain.forEach(subject => {
                        user.subjects.some(userSubject => {
                            if (subject.name === userSubject.name) {
                                mainSubjectsCount[subject.name] += userSubject.poinCompleted
                            }
                            return subject.name === userSubject.name
                        })
                    })
                })
            }

            setMainSubjectsCount(mainSubjectsCount)
        }
    }, [history, dispatch, users, userInfo])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            setMainSubjectsProgress({})

            const pages = {}
            subjectsDataMain.some(subject => {
                if (subject.name === param) {
                    for (let i = 0; i < subject.target; i++) {
                        pages[i+1] = 0
                    }
                }
                return subject.name === param
            })

            users.forEach(user => {
                user.subjects.some(userSubject => {
                    if (userSubject.name === param) {
                        userSubject.completed.forEach(page => {
                            pages[page] += 1  
                        })
                    }
                    return userSubject.name === param
                })
            })

            setMainSubjectsProgress(pages)
        }
    }

    return (
        <Container>
            <h1 style={{textAlign:'center'}}>Subjects Map</h1>
            <Card className='m-auto demon-card' style={{ width: '13rem' }} />

            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    {subjectsDataMain.map(subject => {
                        return (
                            <div key={subject.name}>
                                <Row 
                                    className='py-2 progress-title' 
                                    onClick={activeHandler(subject.name)}
                                >
                                    <Col>
                                        <ProgressSubtitle 
                                            title={subject.name} 
                                            count={users && (mainSubjectsCount[subject.name]/(subject.target*users.length)*100).toFixed(2)} 
                                            active={active} 
                                        />
                                    </Col>
                                </Row>
                                {active === subject.name && 
                                    <Row>
                                        <Col>
                                            <MapSubjectMainGrid
                                                data={Array.from(Array(subject.target).keys())}
                                                progress={mainSubjectsProgress} 
                                                userCount={users.length}
                                            />
                                        </Col>
                                    </Row>
                                }
                            </div>
                        )
                    })}
                </>
            )}
        </Container>
    )
}

export default SubjectsInfoScreen
