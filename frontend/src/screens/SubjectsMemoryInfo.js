import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import MapSubjectExtraGrid from '../components/MapSubjectExtraGrid'
import Message from '../components/Message'
import ProgressSubtitle from '../components/ProgressSubtitle'
import { subjectsDataDalil, subjectsDataDoa, subjectsDataSurat } from '../data/subjectsData'

const SubjectsMemoryInfo = ({ history }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const [active, setActive] = useState('')

    const [suratCount, setSuratCount] = useState(0)
    const [doaCount, setDoaCount] = useState(0)
    const [dalilCount, setDalilCount] = useState(0)
    const [subjectsProgress, setSubjectsProgress] = useState({})

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (!users) {
                dispatch(listUsers())
            } else {
                let suratCount = 0
                let doaCount = 0
                let dalilCount = 0

                users.forEach(user => {
                    suratCount += user.subjectsSurat.length
                    doaCount += user.subjectsDoa.length
                    dalilCount += user.subjectsDalil.length
                })

                setSuratCount((suratCount/(subjectsDataSurat.length*users.length+0.000001)*100).toFixed(2))
                setDoaCount((doaCount/(subjectsDataDoa.length*users.length+0.000001)*100).toFixed(2))
                setDalilCount((dalilCount/(subjectsDataDalil.length*users.length+0.000001)*100).toFixed(2))
            }
        } else {
            history.push('/admin/subjects')
        }
    }, [history, dispatch, users, userInfo])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            setSubjectsProgress({})

            const pages = {}

            if (param === 'surat') {
                subjectsDataSurat.forEach(subject => {
                    pages[subject.name] = 0
                })

                users.forEach(user => {
                    user.subjectsSurat.forEach(userSubject => {
                        pages[userSubject] += 1  
                    })
                })
            } else if (param === 'doa') {
                subjectsDataDoa.forEach(subject => {
                    pages[subject.name] = 0
                })

                users.forEach(user => {
                    user.subjectsDoa.forEach(userSubject => {
                        pages[userSubject] += 1  
                    })
                })
            } else if (param === 'dalil') {
                subjectsDataDalil.forEach(subject => {
                    pages[subject.name] = 0
                })

                users.forEach(user => {
                    user.subjectsDalil.forEach(userSubject => {
                        pages[userSubject] += 1  
                    })
                })
            }

            setSubjectsProgress(pages)
        }
    }

    return (
        <Container>
            {loading ? (
                <Loader pos='auto'/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    {['surat', 'doa', 'dalil'].map(category => {
                        return (
                            <Fragment key={category}>
                                <Row className='py-2 progress-title' onClick={activeHandler(category)}>
                                    <Col>
                                        <ProgressSubtitle 
                                            title={category} 
                                            count={ users &&
                                                category==='surat' 
                                                ? suratCount 
                                                : category==='doa' 
                                                ? doaCount 
                                                : category==='dalil' 
                                                && dalilCount
                                            }
                                            active={active}
                                        />
                                    </Col>
                                </Row>
                                {active === category &&
                                    <Row>
                                        <Col>
                                            <MapSubjectExtraGrid
                                                data={
                                                    category==='surat' 
                                                    ? subjectsDataSurat 
                                                    : category==='doa' 
                                                    ? subjectsDataDoa 
                                                    : category==='dalil' 
                                                    && subjectsDataDalil}
                                                progress={subjectsProgress} 
                                                userCount={users && users.length}
                                            />
                                        </Col>
                                    </Row>
                                }
                            </Fragment>
                        )
                    })}
                </>
            )}
        </Container>
    )
}

export default SubjectsMemoryInfo
