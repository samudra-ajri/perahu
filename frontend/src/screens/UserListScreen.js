import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Card, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import moment from 'moment'
import 'moment/locale/id'
import { USER_DELETE_RESET } from '../constans/userConstans'

const UserListScreen = ({ match, history }) => {
    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users, klp } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    const [remajaCount, setRemajaCount] = useState(0)
    const [praremajaCount, setPraremajaCount] = useState(0)
    const [rawitCount, setRawitCount] = useState(0)
    const [maleCount, setMaleCount] = useState(0)
    const [femaleCount, setFemaleCount] = useState(0)

    const [searchKlp, setSearchKlp] = useState(klp)

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            if(!users || successDelete) {
                dispatch({ type: USER_DELETE_RESET })
                dispatch(listUsers(keyword))
            } else {
                const year = (birthdate) => moment().diff(moment(birthdate), 'year')
                setRemajaCount((users.filter((user)=>(year(user.birthdate) > 14))).length)
                setPraremajaCount((users.filter((user)=>((year(user.birthdate) > 11) && (year(user.birthdate) <= 14))).length))
                setRawitCount((users.filter((user)=>(year(user.birthdate) <= 11))).length)

                setMaleCount((users.filter((user)=>(user.sex === 'l'))).length)
                setFemaleCount((users.filter((user)=>(user.sex === 'p'))).length)

                setSearchKlp(klp)
            }
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo, users, keyword, klp])

    const calculateClass = (user) => {
        const year = moment().diff(moment(user.birthdate), 'year')
        
        if (year > 14) {
            return 'R'
        } else if (year > 11) {
            return 'PR'
        } else {
            return 'CR'
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }

    const searchKlpHandler = (e) => {
        !e.target.value 
            ? history.push(`/admin/userlist`) 
            : history.push(`/admin/userlist/search/${e.target.value}`)
        dispatch(listUsers(e.target.value))
        setSearchKlp(e.target.value)
    }

    return (
        <>
            <h1 style={{textAlign:'center'}}>Users</h1>
            <Card className='m-auto demon-card' style={{ width: '13rem' }} />

            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                <Row>
                    <Col xs={5} sm={4} md={3} xl={2}>
                        <Form>
                            <Form.Group controlId='klp'>
                                <Form.Control
                                    required
                                    as='select'
                                    value={searchKlp}
                                    onChange={searchKlpHandler}
                                    custom
                                >
                                    <option value=''>All Klp</option>
                                    <option value='mrb'>Marbar</option>
                                    <option value='mrs'>Marsel</option>
                                    <option value='mru'>Marut</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className='pt-1 pb-3 px-3'>
                    <Col xs={4} sm={3} md={2} lg={2} xl={1}>
                        <Row>
                            Remaja
                        </Row>
                        <Row>
                            Pra Remaja
                        </Row>
                        <Row>
                            Cabe Rawit
                        </Row>
                    </Col>

                    <Col xs={2} md={1}>
                        <Row>
                            {remajaCount}
                        </Row>
                        <Row>
                            {praremajaCount}
                        </Row>
                        <Row>
                            {rawitCount}
                        </Row>
                    </Col>

                    <Col xs={2} md={1}>
                        <Row>
                            Male
                        </Row>
                        <Row>
                            Female
                        </Row>
                        <Row>
                            <strong>Total</strong>
                        </Row>
                    </Col>
                    
                    <Col>
                        <Row>
                            {maleCount}
                        </Row>
                        <Row>
                            {femaleCount}
                        </Row>
                        <Row>
                            <strong>{maleCount+femaleCount}</strong>
                        </Row>
                    </Col>
                </Row>

                <Table hover responsive size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Klp</th>
                            <th>Sex</th>
                            <th>Class</th>
                            <th>Main (%)</th>
                            <th>Extra (%)</th>
                            <th>Memory (%)</th>
                            <th>Active</th>
                            <th>Admin</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user, i) => (
                        <tr key={user._id}>
                            <td>{i+1}</td>
                            <td>{user.name}</td>
                            <td>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>{(user.klp).toUpperCase()}</td>
                            <td>{user.sex === 'l' ? 'Male' : 'Female'}</td>
                            <td>{calculateClass(user)}</td>
                            <td>{(user.subjects.reduce((acc, subject) => acc + subject.poinCompleted, 0)/2208*100).toFixed(1)}</td>
                            <td>{(user.subjectsExtra.length/14*100).toFixed(1)}</td>
                            <td>{((user.subjectsSurat.length + user.subjectsDoa.length + user.subjectsDalil.length)/74*100).toFixed(1)}</td>
                            <td>
                                {user.isActive ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {user.isAdmin ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td style={{ textAlign:'right' }}>
                                <LinkContainer to={`/admin/user/${user._id}/info`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-angle-right'></i>
                                    </Button>
                                </LinkContainer>
                                
                            </td>
                            <td>
                                <Button
                                    variant='secondary'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                </>
            )}
        </>
    )
}

export default UserListScreen