import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import moment from 'moment'
import 'moment/locale/id';
import { USER_UPDATE_PROFILE_RESET } from '../constans/userConstans'

const ProfileEditScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [klp, setKlp] = useState('')
    const [sex, setSex] = useState('')
    const [isMuballigh, setIsMuballigh] = useState(false)
    const [dayBirth, setDayBirth] = useState('')
    const [monthBirth, setMonthBirth] = useState('')
    const [yearBirth, setYearBirth] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                success && history.push('/')
            } else {
                const dateBirth = moment(user.birthdate)
                setDayBirth(dateBirth.date())
                setMonthBirth(dateBirth.month()+1)
                setYearBirth(dateBirth.year())
                setName(user.name)
                setEmail(user.email)
                setKlp(user.klp)
                setSex(user.sex)
                setIsMuballigh(user.isMuballigh)
            }
        }
    }, [history, userInfo, user, success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, klp, sex, isMuballigh, dayBirth, monthBirth, yearBirth, password }))
        }
    }

    return (
        <FormContainer>
            <h1 style={{textAlign:'center'}}>Perbarui Profil</h1>
            <Card className='m-auto demon-card' style={{ width: '13rem' }} />

            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader pos='auto'/>}
            
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

                <Row>
                    <Col xs={7}>
                        <Form.Group controlId='klp'>
                            <Form.Label>Klp</Form.Label>
                            <Form.Control
                                required
                                as='select'
                                value={klp}
                                onChange={(e) => setKlp(e.target.value)}
                                custom
                            >
                                <option value=''disabled>Select...</option>
                                <option value='mrb'>Marbar</option>
                                <option value='mrs'>Marsel</option>
                                <option value='mru'>Marut</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='sex'>
                            <Form.Label>L/P</Form.Label>
                            <Form.Control
                                required
                                as='select'
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                custom
                            >
                                <option value='' disabled>Select...</option>
                                <option value='l'>Laki-laki</option>
                                <option value='p'>Perempuan</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Label className='mb-auto'>Tanggal Lahir</Form.Label>
                <Row>
                    <Col>
                        <Form.Group controlId='dayBirth'>
                            <Form.Label><small>Tanggal</small></Form.Label>
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
                            <Form.Label><small>Bulan</small></Form.Label>
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
                            <Form.Label><small>Tahun</small></Form.Label>
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
                    <Form.Label>Ubah Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Konfirmasi Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='isMuballigh'>
                    <Form.Check
                        type='checkbox'
                        checked={isMuballigh}
                        label='Sudah muballigh'
                        value={isMuballigh}
                        onChange={(e) => setIsMuballigh(!isMuballigh)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Perbarui
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ProfileEditScreen
