import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import MapSubjectExtraGrid from '../components/MapSubjectExtraGrid'
import Message from '../components/Message'
import ProgressSubtitle from '../components/ProgressSubtitle'
import { subjectsDataExtra } from '../data/subjectsData'

const SubjectsExtraInfo = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const [subjectsCount, setSubjectsCount] = useState(0)
    const [subjectsProgress, setSubjectsProgress] = useState({})

    const [usersCount, setUsersCount] = useState(0)


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (!users) {
                dispatch(listUsers())
            } else {
                let count = 0
                users.forEach(user => {
                    count += user.subjectsExtra.length
                })

                setSubjectsCount((count/(subjectsDataExtra.length*users.length+0.000001)*100).toFixed(2))

                const pages = {}
                subjectsDataExtra.forEach(subject => {
                    pages[subject.name] = 0
                })

                users.forEach(user => {
                    user.subjectsExtra.forEach(userSubject => {
                        pages[userSubject] += 1  
                    })
                })

                setSubjectsProgress(pages)

                setUsersCount(users.length)
            }
        } else {
            history.push('/admin/subjects')
        }
    }, [history, dispatch, users, userInfo])

    return (
        <Container>
            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row className='py-2 progress-title'>
                        <Col>
                            <ProgressSubtitle 
                                title='Extra' 
                                count={subjectsCount} 
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MapSubjectExtraGrid
                                data={subjectsDataExtra}
                                progress={subjectsProgress || 0} 
                                userCount={usersCount}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}

export default SubjectsExtraInfo
