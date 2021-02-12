import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProgressSubtitle from '../components/ProgressSubtitle'
import SubjectExtraGrid from '../components/SubjectExtraGrid'
import { subjectsDataDalil, subjectsDataDoa, subjectsDataSurat } from '../data/subjectsData'

const SubjectsMemoryUser = ({ match, history }) => {
    const userId = match.params.id

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const [active, setActive] = useState('')

    const [suratCount, setSuratCount] = useState(0)
    const [doaCount, setDoaCount] = useState(0)
    const [dalilCount, setDalilCount] = useState(0)
    const [subjectsProgress, setSubjectsProgress] = useState([])

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (!user.name) {
                dispatch(getUserDetails(userId))
            } else {
                setSuratCount((user.subjectsSurat.length/subjectsDataSurat.length*100).toFixed(2))
                setDoaCount((user.subjectsDoa.length/subjectsDataDoa.length*100).toFixed(2))
                setDalilCount((user.subjectsDalil.length/subjectsDataDalil.length*100).toFixed(2))
            }
        } else {
            history.push('/login')
        }
    }, [history, dispatch, user, userInfo, userId])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
            setSubjectsProgress([])

            if (param === 'surat') {
                setSubjectsProgress(user.subjectsSurat)
            } else if (param === 'doa') {
                setSubjectsProgress(user.subjectsDoa)
            } else if (param === 'dalil') {
                setSubjectsProgress(user.subjectsDalil)
            }
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
                                            count={
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
                                            <SubjectExtraGrid
                                                data={
                                                    category==='surat' 
                                                    ? subjectsDataSurat 
                                                    : category==='doa' 
                                                    ? subjectsDataDoa 
                                                    : category==='dalil' 
                                                    && subjectsDataDalil}
                                                progress={subjectsProgress} 
                                                disabled={true}
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

export default SubjectsMemoryUser