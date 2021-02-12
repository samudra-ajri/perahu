import React, { Fragment, useEffect, useState } from 'react'
import { Card, Row, Col, Form, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ChartUserSubject from '../components/ChartUserSubject'
import { getUserDetails, updateUser } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { USER_LIST_RESET, USER_UPDATE_RESET } from '../constans/userConstans'
import { subjectsDataMain, subjectsDataExtra, subjectsDataSurat, subjectsDataDoa, subjectsDataDalil } from '../data/subjectsData'
import ProgressSubtitle from '../components/ProgressSubtitle'
import SubjectMainGrid from '../components/SubjectMainGrid'
import SubjectExtraGrid from '../components/SubjectExtraGrid'

const UserInfoScreen = ({ match, history }) => {
    const userId = match.params.id

    const [isActive, setIsActive] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    const [active, setActive] = useState('')
    const [focus, setFocus] = useState('main')

    const [subjectProgress, setSubjectProgress] = useState([])
    const [totalProgress, setTotalProgress] = useState([])
    const [mainTotalProgressCount, setMainTotalProgressCount] = useState(0)
    const [extraTotalProgressCount, setExtraTotalProgressCount] = useState(0)
    const [memoryTotalProgressCount, setMemoryTotalProgressCount] = useState(0)
    const [suratCount, setSuratCount] = useState(0)
    const [doaCount, setDoaCount] = useState(0)
    const [dalilCount, setDalilCount] = useState(0)

    useEffect(() => {
        if (!userInfo && !userInfo.isAdmin) {
            history.push('/login')
        } else {
            if (!user.name || user._id !== userId || successUpdate) {
                dispatch({ type: USER_LIST_RESET })
                dispatch({ type: USER_UPDATE_RESET })
                dispatch(getUserDetails(userId))
            } else {
                setIsActive(user.isActive)
                setIsAdmin(user.isAdmin)

                const countProgress = () => {
                    let progress = []
                    
                    subjectsDataMain.forEach(subject=> {
                        let foundIdx = -1
                        let i = 0
                        while (i < user.subjects.length && foundIdx === -1) {
                            if (subject.name === user.subjects[i].name) {
                                foundIdx = i
                            }
                            i++
                        }
                        
                        foundIdx !== -1
                        ? progress.push((user.subjects[foundIdx].poinCompleted/subject.target*100).toFixed(2))
                        : progress.push(0)
                    })
                    
                    setTotalProgress(progress)
                }
                
                if (focus==='main') {
                    countProgress()
                } else if (focus==='extra') {
                    setTotalProgress(user.subjectsExtra)
                }

                const totalProgress = user.subjects.reduce((acc, subject) => acc + subject.completed.length, 0)

                setMainTotalProgressCount(totalProgress)
                setExtraTotalProgressCount(user.subjectsExtra.length)
                setMemoryTotalProgressCount(
                    user.subjectsSurat.length + 
                    user.subjectsDoa.length +
                    user.subjectsDalil.length
                )
                setSuratCount((user.subjectsSurat.length/27*100).toFixed(2))
                setDoaCount((user.subjectsDoa.length/28*100).toFixed(2))
                setDalilCount((user.subjectsDalil.length/19*100).toFixed(2))
            }
        }
    }, [dispatch, history, userInfo, userId, user, successUpdate, focus])

    const updateActive = () => {
        if (window.confirm('Are you sure?')) {
            const updatedUser = user
            updatedUser.isActive = !isActive

            dispatch(updateUser(updatedUser))
            setIsActive(!isActive)
        }
        
    }

    const updateAdmin = () => {
        if (window.confirm('Are you sure?')) {
            const updatedUser = user
            updatedUser.isAdmin = !isAdmin

            dispatch(updateUser(updatedUser))
            setIsAdmin(!isAdmin)
        }
    }

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            setSubjectProgress([])

            let found = false
            let i = 0
            while (i < user.subjects.length && found === false) {
                if (user.subjects[i].name === param) {
                    setSubjectProgress(user.subjects[i].completed)
                    found = true
                }
                i++
            }

            if (param === 'surat') {
                setTotalProgress(user.subjectsSurat)
            } else if (param === 'doa') {
                setTotalProgress(user.subjectsDoa)
            } else if (param === 'dalil') {
                setTotalProgress(user.subjectsDalil)
            }

        }
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light mx-3 mt-3 mb-1'>
                <i className='fas fa-arrow-left'></i> Back
            </Link>

            <h1 style={{ textAlign:'center' }}>{user.name}</h1>
            <Card className='m-auto demon-card' style={{ width: '15rem' }} />

            {loadingUpdate ? (
                <div style={{ textAlign:'center', marginTop:'-20px' }}>updating...</div>
            ) : (
                errorUpdate ? (
                    <Message variant='danger'>{errorUpdate}</Message>
                ) : (
                    <>
                        <Form style={{ marginTop:'-20px' }}>
                            <Row className='justify-content-center'>
                                <Col xs={3} md={2} lg={1}>
                                    <Form.Group controlId='isAdmin'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Admin'
                                        checked={isAdmin}
                                        onChange={updateAdmin}
                                        custom
                                    />
                                    </Form.Group>
                                </Col>
                                <Col xs='auto'>
                                    <Form.Group controlId='isActive'>
                                    <Form.Check
                                        type='checkbox'
                                        label='Active as Generus'
                                        checked={isActive}
                                        onChange={updateActive}
                                        custom
                                    />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </>
                )
            )}
            

            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row className='justify-content-center py-3'>
                        <Col xs={3} onClick={(e) => setFocus('main')} className={focus==='main' ? 'chart-subject-focused' : 'chart-subject'}>
                            <ChartUserSubject title='Main Subjects' data={[mainTotalProgressCount, 2208-mainTotalProgressCount]} />
                        </Col>
                        <Col xs={3} onClick={(e) => setFocus('extra')} className={focus==='extra' ? 'chart-subject-focused' : 'chart-subject'}>
                            <ChartUserSubject title='Extra Subjects' data={[extraTotalProgressCount, 14-extraTotalProgressCount]} />
                        </Col>
                        <Col xs={3} onClick={(e) => setFocus('memory')} className={focus==='memory' ? 'chart-subject-focused' : 'chart-subject'}>
                            <ChartUserSubject title='Memory Subjects' data={[memoryTotalProgressCount, 74-memoryTotalProgressCount]} />
                        </Col>
                    </Row>

                    <Container>
                        {focus==='main' ? (
                            subjectsDataMain.map((subject, i) => {
                                return(
                                    <div key={subject.name}>
                                        <Row 
                                            className='py-2 progress-title' 
                                            onClick={activeHandler(subject.name)}
                                        >
                                            <Col>
                                                {totalProgress.length !== 0 &&
                                                    <ProgressSubtitle 
                                                        title={subject.name} 
                                                        count={totalProgress[i]} 
                                                        active={active} 
                                                    />
                                                }
                                            </Col>
                                        </Row>
                                        {active === subject.name && 
                                            <Row>
                                                <Col>
                                                    <SubjectMainGrid 
                                                        data={Array.from(Array(subject.target).keys())} 
                                                        progress={subjectProgress} 
                                                        disabled={true}
                                                    />
                                                </Col>
                                            </Row>
                                        }
                                    </div>
                                )
                            })
                        ) : (
                            focus==='extra' ? (
                                <>
                                    <Row 
                                        className='py-2'
                                    >
                                        <Col>
                                            <ProgressSubtitle 
                                                title={'Extra'} 
                                                count={(extraTotalProgressCount/14*100).toFixed(2)} 
                                                active={active} 
                                            />
                                        </Col>
                                    </Row>
                                    <SubjectExtraGrid 
                                        data={subjectsDataExtra} 
                                        progress={totalProgress}
                                        disabled={true}
                                    />
                                </>
                            ) : (
                                focus==='memory' && (
                                    ['surat', 'doa', 'dalil'].map(category => {
                                        return (
                                            <Fragment key={category}>
                                                <Row className='py-2 progress-title' onClick={activeHandler(category)}>
                                                    <Col>
                                                        <ProgressSubtitle 
                                                        title={category} 
                                                        count={category==='surat' ? suratCount : category==='doa' ? doaCount : category==='dalil' && dalilCount} 
                                                        active={active} />
                                                    </Col>
                                                </Row>
                                                {active === category &&
                                                    <Row>
                                                        <Col>
                                                            <SubjectExtraGrid 
                                                                data={category==='surat' ? subjectsDataSurat : category==='doa' ? subjectsDataDoa : category==='dalil' && subjectsDataDalil}
                                                                progress={totalProgress} 
                                                                disabled={true}
                                                            />
                                                        </Col>
                                                    </Row>
                                                }
                                            </Fragment>
                                        )
                                    })
                                )
                            )
                        )}
                    </Container>
                </>
            )}
        </>
    )
}

export default UserInfoScreen