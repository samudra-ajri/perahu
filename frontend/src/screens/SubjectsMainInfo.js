import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import MapSubjectMainGrid from '../components/MapSubjectMainGrid'
import Message from '../components/Message'
import ProgressSubtitle from '../components/ProgressSubtitle'
import { subjectsDataMain } from '../data/subjectsData'

const SubjectsMainInfo = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const [active, setActive] = useState('')

    const [subjectsCount, setSubjectsCount] = useState({})
    const [subjectsProgress, setSubjectsProgress] = useState({})

    const [usersCount, setUsersCount] = useState(0)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            const subjectsCount = {}

            subjectsDataMain.forEach(subject => {
                subjectsCount[subject.name] = 0
            })

            if (!users) {
                dispatch(listUsers())
            } else {
                subjectsDataMain.forEach(subject => {
                    users.forEach(user => {
                        user.subjects.some(userSubject => {
                            if (subject.name === userSubject.name) {
                                subjectsCount[subject.name] += userSubject.poinCompleted
                            }
                            return subject.name === userSubject.name
                        })
                    })
                    subjectsCount[subject.name] = (subjectsCount[subject.name]/(subject.target*users.length+0.000001)*100).toFixed(2)
                })
                
                setUsersCount(users.length+0.000001)
            }

            setSubjectsCount(subjectsCount)

        } else {
            history.push('/admin/subjects')
        }
    }, [history, dispatch, users, userInfo])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            setSubjectsProgress({})

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

            setSubjectsProgress(pages)
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
                                            <MapSubjectMainGrid
                                                data={Array.from(Array(subject.target).keys())}
                                                progress={subjectsProgress} 
                                                userCount={usersCount}
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

export default SubjectsMainInfo
