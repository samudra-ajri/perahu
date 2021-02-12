import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProgressSubtitle from '../components/ProgressSubtitle'
import SubjectExtraGrid from '../components/SubjectExtraGrid'
import { subjectsDataExtra } from '../data/subjectsData'

const SubjectExtraUser = ({ match, history}) => {
    const userId = match.params.id

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const [subjectsCount, setSubjectsCount] = useState(0)
    const [subjectsProgress, setSubjectsProgress] = useState([])

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (!user.name) {
                dispatch(getUserDetails(userId))
            } else {
                setSubjectsCount((user.subjectsExtra.length/subjectsDataExtra.length*100).toFixed(2))

                setSubjectsProgress(user.subjectsExtra)
            }
        } else {
            history.push('/login')
        }
    }, [history, dispatch, user, userInfo, userId])

    return (
        <Container>
            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row 
                        className='py-2'
                    >
                        <Col>
                            <ProgressSubtitle 
                                title={'Extra'} 
                                count={subjectsCount} 
                                active={'Extra'} 
                            />
                        </Col>
                    </Row>
                    <SubjectExtraGrid 
                        data={subjectsDataExtra} 
                        progress={subjectsProgress}
                        disabled={true}
                    />
                </>
            )}
        </Container>
    )
}

export default SubjectExtraUser