import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container, ProgressBar, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { subjectsDataExtra } from '../data/subjectsData'
import { addUserExtraSubject, getUserDetails } from '../actions/userActions'
import { USER_ADD_EXTRA_SUBJECT_RESET } from '../constans/userConstans'

const SubjectsExtraScreen = ({ history }) => {
    const dispatch = useDispatch()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userExtraSubjectAdd = useSelector((state) => state.userExtraSubjectAdd)
    const { success: successExtraSubject, error: errorExtraSubject } = userExtraSubjectAdd

    const [totalProgress, setTotalProgress] = useState([])

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || successExtraSubject) {
                dispatch({ type: USER_ADD_EXTRA_SUBJECT_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setTotalProgress(user.subjectsExtra)
            }
        }
    }, [dispatch, userInfo, user, successExtraSubject, history])

    const clickHandler = (e) => {
        if (!totalProgress.includes(e.target.id)) {
            dispatch(addUserExtraSubject(
                user._id, 
                {
                    type: 'extra',
                    subjects: [...totalProgress, e.target.id]
                }
            ))
        } else {
            dispatch(addUserExtraSubject(
                user._id, 
                {
                    type: 'extra',
                    subjects: totalProgress.filter((target)=>(target !== e.target.id))
                }
            ))
        }
    }

    const resetButtonHandler = () => {
        dispatch(addUserExtraSubject(
            user._id, 
            {
                type: 'extra',
                subjects: []
            }
        ))
    }

    return (
        <Container className='px-3'>
            <h1 style={{textAlign:'center'}}>MATERI PENUNJANG </h1>
            <Card border="light" style={{ width: '13rem', margin:'auto' }} />

            { error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                <Row>
                
                    <Col>
                        <strong>TOTAL MATERI PENUNJANG</strong> 
                        <Row>
                            <Col>
                                <ProgressBar
                                    variant={totalProgress.length/14*100 >= 70 ? 'success' : totalProgress.length/14*100 >= 30 ? 'warning' : 'secondary'} 
                                    now={totalProgress.length/14*100} 
                                    label={`${(totalProgress.length/14*100).toFixed(2)}%`}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <hr />
                {errorExtraSubject && <Message variant='danger'>{errorExtraSubject}</Message>}
                <Row>
                    <Col>
                        {subjectsDataExtra.map((subject) => {
                            return(
                                <Button
                                    key={subject.name}
                                    id={subject.name}
                                    size='sm'
                                    className='mr-1 mb-1'
                                    variant={totalProgress.includes(subject.name) ? 'success' : 'outline-success'}
                                    onClick={clickHandler}
                                >
                                    {subject.name} 
                                </Button>
                            )
                        })}
                    </Col>
                </Row>
                <Row className='pt-2'>
                    <Col>
                         <Row className='ml-auto'>
                            <Button 
                                variant='outline-secondary' 
                                size='sm' 
                                className='mr-2'
                                onClick={resetButtonHandler}
                            >
                                Reset
                            </Button>
                            {loading && <Loader size='sm'/>}
                        </Row>
                    </Col>
                </Row>
                </>
            )}
        </Container>
    )
}

export default SubjectsExtraScreen