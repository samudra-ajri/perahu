import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { subjectsDataSurat } from '../data/subjectsData'
import { subjectsDataDoa } from '../data/subjectsData'
import { subjectsDataDalil } from '../data/subjectsData'
import { addUserExtraSubject, getUserDetails } from '../actions/userActions'
import { USER_ADD_EXTRA_SUBJECT_RESET } from '../constans/userConstans'
import ProgressTitle from '../components/ProgressTitle'
import ProgressSubtitle from '../components/ProgressSubtitle'
import ProgressButtons from '../components/ProgressButtons'
import SubjectExtraGrid from '../components/SubjectExtraGrid'

const SubjectsMemoryScreen = ({ history }) => {
    const dispatch = useDispatch()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userExtraSubjectAdd = useSelector((state) => state.userExtraSubjectAdd)
    const { success: successExtraSubject, error: errorExtraSubject } = userExtraSubjectAdd

    const [active, setActive] = useState([])
    const [totalProgress, setTotalProgress] = useState([])
    const [totalProgressCount, setTotalProgressCount] = useState([])
    const [suratCount, setSuratCount] = useState([])
    const [doaCount, setDoaCount] = useState([])
    const [dalilCount, setDalilCount] = useState([])

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || successExtraSubject) {
                dispatch({ type: USER_ADD_EXTRA_SUBJECT_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setTotalProgressCount(
                    ((
                        user.subjectsSurat.length + 
                        user.subjectsDoa.length +
                        user.subjectsDalil.length
                    )/74*100).toFixed(2)
                )
                setSuratCount((user.subjectsSurat.length/27*100).toFixed(2))
                setDoaCount((user.subjectsDoa.length/28*100).toFixed(2))
                setDalilCount((user.subjectsDalil.length/19*100).toFixed(2))
            }
        }
    }, [dispatch, userInfo, user, successExtraSubject, history])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            if (param === 'surat') {
                setTotalProgress(user.subjectsSurat)
            } else if (param === 'doa') {
                setTotalProgress(user.subjectsDoa)
            } else if (param === 'dalil') {
                setTotalProgress(user.subjectsDalil)
            }
        }
        
    }

    const clickHandler = (e) => {
        if (!totalProgress.includes(e.target.id)) {
            dispatch(addUserExtraSubject(
                user._id, 
                {
                    type: active,
                    subjects: [...totalProgress, e.target.id]
                }
            ))
            setTotalProgress([...totalProgress, e.target.id])
        } else {
            dispatch(addUserExtraSubject(
                user._id, 
                {
                    type: active,
                    subjects: totalProgress.filter((target)=>(target !== e.target.id))
                }
            ))
            setTotalProgress(totalProgress.filter((target)=>(target !== e.target.id)))
        }
    }

    const finishButtonHandler = () => {
        let subjects
        if (active === 'surat') {
            subjects = subjectsDataSurat.map(subject => subject.name)
        } else if (active === 'doa') {
            subjects = subjectsDataDoa.map(subject => subject.name)
        } else if (active === 'dalil') {
            subjects = subjectsDataDalil.map(subject => subject.name)
        } 

        dispatch(addUserExtraSubject(
            user._id, 
            {
                type: active,
                subjects
            }
        ))

        setTotalProgress(subjects)
    }

    const resetButtonHandler = () => {
        dispatch(addUserExtraSubject(
            user._id, 
            {
                type: active,
                subjects: []
            }
        ))

        setTotalProgress([])
    }

    return (
        <Container className='px-3'>
            <h1 style={{textAlign:'center'}}>MATERI HAFALAN</h1>
            <Card border="light" style={{ width: '13rem', margin:'auto' }} />

            {errorExtraSubject && <Message variant='danger'>{errorExtraSubject}</Message>}
            { error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                <Row>
                    <Col>
                        <ProgressTitle title='TOTAL MATERI HAFALAN' count={totalProgressCount}/>
                    </Col>
                </Row>

                {['surat', 'doa', 'dalil'].map(category => {
                    return (
                        <>
                        <Row className='py-2 progress-title' onClick={activeHandler(category)}>
                            <Col>
                                <ProgressSubtitle 
                                title={category} 
                                count={category==='surat' ? suratCount : category==='doa' ? doaCount : category==='dalil' && dalilCount} 
                                active={active} />
                            </Col>
                        </Row>
                        {active === category &&
                            <>
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
                                        data={category==='surat' ? subjectsDataSurat : category==='doa' ? subjectsDataDoa : category==='dalil' && subjectsDataDalil}
                                        progress={totalProgress} 
                                        action={clickHandler} 
                                    />
                                </Col>
                            </Row>
                            </>
                        }
                        </>
                    )
                })}
                </>
            )}
        </Container>
    )
}

export default SubjectsMemoryScreen