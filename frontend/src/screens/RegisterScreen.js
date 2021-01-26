import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [klp, setKlp] = useState('')
    const [dayBirth, setDayBirth] = useState('')
    const [monthBirth, setMonthBirth] = useState('')
    const [yearBirth, setYearBirth] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error} = userRegister

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, klp, dayBirth, monthBirth, yearBirth, password))
        }
    }

    return (
        <FormContainer>
            <h1 style={{textAlign:'center'}}>Daftar</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='klp'>
                    <Form.Label>Klp</Form.Label>
                    <Form.Control
                        required
                        as='select'
                        value={klp}
                        onChange={(e) => setKlp(e.target.value)}
                        custom
                    >
                        <option value=''>Select...</option>
                        <option value='mrb'>Marbar</option>
                        <option value='mrs'>Marsel</option>
                        <option value='mru'>Marut</option>
                    </Form.Control>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group controlId='dayBirth'>
                            <Form.Label>Tanggal Lahir</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Tanggal'
                                value={dayBirth}
                                maxLength={2}
                                onChange={(e) => setDayBirth(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='monthBirth'>
                            <Form.Label>Bulan Lahir</Form.Label>
                            <Form.Control
                                required
                                as='select'
                                value={monthBirth}
                                onChange={(e) => setMonthBirth(e.target.value)}
                                custom
                            >
                                <option value='' disabled>Bulan</option>
                                <option value='1'>Januari</option>
                                <option value='2'>Februari</option>
                                <option value='3'>Maret</option>
                                <option value='4'>April</option>
                                <option value='5'>Mei</option>
                                <option value='6'>Juni</option>
                                <option value='7'>Juli</option>
                                <option value='8'>Agustus</option>
                                <option value='9'>September</option>
                                <option value='10'>Oktober</option>
                                <option value='11'>November</option>
                                <option value='12'>Desember</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='yearBirth'>
                            <Form.Label>Tahun Lahir</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Tahun'
                                value={yearBirth}
                                maxLength={4}
                                onChange={(e) => setYearBirth(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Konfirmasi Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Daftar
                </Button>
            </Form>

            <Row className='py-3'>
                <Col style={{textAlign:'center'}}>
                    Punya Akun?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen