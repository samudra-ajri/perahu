import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Card, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { calculateRank, calculateTotalSubjectsPoin } from '../actions/subjectActions'

import moment from 'moment'
import 'moment/locale/id';

const ProfileScreen = ({ history }) => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [userInfo, history])
    
    const calculateClass = () => {
        const year = moment().diff(moment(userInfo.birthdate), 'year')
        if (year > 15) {
            return 'Remaja'
        } else if (year > 12) {
            return 'Praremaja'
        } else {
            return 'Cabe Rawit'
        }
    }
    
    const poin = calculateTotalSubjectsPoin(userInfo.subjects)
    
    return (
        <Container>
            <h1 style={{textAlign:'center'}}>PROFIL</h1>
            <Card border="light" style={{ width: '13rem', margin:'auto' }} />
            <Row className="justify-content-md-center">
                <Col md={4} lg={3}>
                    <Card className='text-center' border="light" style={{ width: '13rem', margin:'auto' }}>
                        <Card.Body>
                            <Card.Title>Rank {calculateRank(poin).rank}</Card.Title>
                            <Card.Text>
                                <i style={{ color: '#D5B645' }} className='fas fa-star'></i> <small>Poin: {poin}</small>
                            </Card.Text>
                        </Card.Body>
                        <Card.Img variant='bottom' src={calculateRank(poin).img} />
                    </Card>
                </Col>
                <Col md={5}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2>{userInfo.name}</h2>
                            <strong>Rank:</strong> {calculateRank(poin).rank}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>
                                <strong>Email:</strong> {userInfo.email}
                            </p>
                            <p>
                                <strong>Lahir:</strong> {moment(userInfo.birthdate).locale('id').format('ll')}
                            </p>
                            <p>
                                <strong>Klp:</strong> {userInfo.klp.toUpperCase()}
                            </p>
                            <p>
                                <strong>Kelas: </strong>
                                {calculateClass()}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p style={{textAlign:'center'}}>
                                <small><i>"Wayarjuna rohmatahu wayakhofuna adhabahu."</i><br/>QS. Al-Isro:57</small>
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen