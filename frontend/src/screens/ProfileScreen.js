import React, { useEffect } from 'react'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, listUserRanked } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import TopRank from '../components/TopRank'
import CardRank from '../components/CardRank'
import Profile from '../components/Profile'

const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userTopRanked = useSelector((state) => state.userTopRanked)
    const { loading: loadingRanked, error: errorRanked, users: usersRanked } = userTopRanked

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name ) {
                dispatch(getUserDetails('profile'))
            } else {
                dispatch(listUserRanked())
            }
        }

    }, [userInfo, user, dispatch, history])

    return (
        loading 
        ? <Loader pos='auto'/> 
        : error 
        ? <Message variant='danger'>error</Message> 
        : (
            <Container>
                <h1 style={{textAlign:'center'}}>PROFIL</h1>

                <Card border="light" style={{ width: '13rem', margin:'auto' }} />
                
                <Row className="justify-content-md-center">
                    <Col md={4} lg={3}>
                        <CardRank user={user} />
                    </Col>

                    <Col md={5} lg={4}>
                    <Profile user={user} />
                    </Col>

                    <Col lg={4}>
                        {loadingRanked 
                            ? <Loader pos='auto' /> 
                            : errorRanked 
                            ? <Message variant='danger'></Message> 
                            : (
                                
                                loading 
                                ? <Loader pos='auto' /> 
                                : error 
                                ? <Message variant='danger'></Message> 
                                : <TopRank users={usersRanked}/>
                                
                            )
                        }
                    </Col>
                </Row>
            </Container>
        )
    )
}

export default ProfileScreen