import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { subjectsDataExtra } from '../data/subjectsData'
import { addUserExtraSubject, getUserDetails } from '../actions/userActions'
import { USER_ADD_EXTRA_SUBJECT_RESET } from '../constans/userConstans'
import ProgressTitle from '../components/ProgressTitle'
import ProgressButtons from '../components/ProgressButtons'
import SubjectExtraGrid from '../components/SubjectExtraGrid'

const SubjectsExtraScreen = ({ history }) => {
    const dispatch = useDispatch()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userExtraSubjectAdd = useSelector((state) => state.userExtraSubjectAdd)
    const { success: successExtraSubject, error: errorExtraSubject } = userExtraSubjectAdd

    const [totalProgress, setTotalProgress] = useState([])
    const [totalProgressCount, setTotalProgressCount] = useState([])

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || successExtraSubject) {
                dispatch({ type: USER_ADD_EXTRA_SUBJECT_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setTotalProgressCount((user.subjectsExtra.length/14*100).toFixed(2))
            }
            setTotalProgress(user.subjectsExtra)
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

    const finishButtonHandler = () => {
        dispatch(addUserExtraSubject(
            user._id, 
            {
                type: 'extra',
                subjects: subjectsDataExtra.map(a => a.name)
            }
        ))
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

            {errorExtraSubject && <Message variant='danger'>{errorExtraSubject}</Message>}
            { error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                <Row>
                    <Col>
                        <ProgressTitle title='TOTAL MATERI PENUNJANG' count={totalProgressCount}/>
                    </Col>
                </Row>

                <Row className='pb-2'>
                    <Col>
                        <ProgressButtons 
                            finishAction={finishButtonHandler} 
                            resetActoin={resetButtonHandler} 
                            loading={loading}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SubjectExtraGrid 
                            data={subjectsDataExtra} 
                            progress={totalProgress} 
                            action={clickHandler}
                        />
                    </Col>
                </Row>
                </>
            )}
        </Container>
    )
}

export default SubjectsExtraScreen