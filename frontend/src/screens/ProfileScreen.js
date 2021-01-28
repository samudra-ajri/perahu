import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Card, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { calculateRank } from '../actions/subjectActions'
import { getUserDetails } from '../actions/userActions'


import moment from 'moment'
import 'moment/locale/id';

const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails


    const [className, setClassName] = useState('')
    const [rankObj, setRankObj] = useState('')

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name ) {
                dispatch(getUserDetails('profile'))
            } else {
                const calculateClass = () => {
                    const year = moment().diff(moment(user.birthdate), 'year')
                    if (year > 15) {
                        setClassName('Remaja')
                    } else if (year > 12) {
                        setClassName('Remaja')
                    } else {
                        setClassName('Cabe Rawit')
                    }
                }

                calculateClass(user)

                setRankObj(calculateRank(user.poin))
            }
        }

    }, [userInfo, user, dispatch, history])
    
    return (
        loading ? <Loader pos='auto'/> : error ? <Message>error</Message> : (
        <Container>
            <h1 style={{textAlign:'center'}}>PROFIL</h1>
            <Card border="light" style={{ width: '13rem', margin:'auto' }} />
            <Row className="justify-content-md-center">
                <Col md={4} lg={3}>
                    <Card className='text-center' border="light" style={{ width: '13rem', margin:'auto' }}>
                        <Card.Body>
                            <Card.Title>Rank {rankObj.rank}</Card.Title>
                            <Card.Text>
                                <i style={{ color: '#D5B645' }} className='fas fa-star'></i> <small>Poin: {user.poin}</small>
                            </Card.Text>
                        </Card.Body>
                        <Card.Img variant='bottom' src={rankObj.img} />
                    </Card>
                </Col>

                <Col md={5} lg={4}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2 style={{textAlign:'center'}}>{user.name}</h2>
                            <strong>Rank:</strong> {rankObj.rank}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Lahir:</strong> {moment(user.birthdate).locale('id').format('ll')}
                            </p>
                            <p>
                                <strong>Klp:</strong> {user.klp && user.klp.toUpperCase()}
                            </p>
                            <p>
                                <strong>Kelas: </strong>
                                {className}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p style={{textAlign:'center'}}>
                                <small><i>"Wayarjuna rohmatahu wayakhofuna adhabahu."</i><br/>QS. Al-Isro:57</small>
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col lg={4}>
                    <h5 style={{textAlign:'center'}} className='mt-3'><i style={{ color: '#D5B645' }} className='fas fa-trophy'></i> Top 5 Ranked</h5>
                    <Table hover> 
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Player</th>
                                <th>Poin</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td><i style={{ color: '#D5B645' }} className='fas fa-star'></i> Otto</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td><i style={{ color: '#D5B645' }} className='fas fa-star'></i> Thornton</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>@twitter</td>
                                <td><i style={{ color: '#D5B645' }} className='fas fa-star'></i> Thornton</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>@twitter</td>
                                <td><i style={{ color: '#D5B645' }} className='fas fa-star'></i> Thornton</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Samudra Ajri Kifli</td>
                                <td><i style={{ color: '#D5B645' }} className='fas fa-star'></i> Thornton</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        )
    )
}

export default ProfileScreen