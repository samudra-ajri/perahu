import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Container, ProgressBar, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { subjectsDataMain } from '../data/subjectsData'

const SubjectsMainScreen = ({ history }) => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [active, setActive] = useState('')

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [userInfo, history])

    const activeHandler = param => () => {
        if (active === param) {
            setActive('')
        } else {
            setActive(param)
        }
    }

    const countProgress = targetSubject => {
        let i = 0
        
        while (i < userInfo.subjects.length) {
            if (userInfo.subjects[i].name === targetSubject.name) {
                return (Math.round(userInfo.subjects[i].completed.length/targetSubject.target*100).toFixed(1))
            }

            i++
        }
    }

    return (
        <Container className='px-3'>
            <h1 style={{textAlign:'center'}}>MATERI POKOK</h1>
            <Card border="light" style={{ width: '13rem', margin:'auto' }} />
            
            {subjectsDataMain.map((subject) => {
                return(
                    <div key={subject.name}>
                        <Row 
                            className='py-2 progress-title' 
                            onClick={activeHandler(subject.name)}
                        >
                            <Col>
                                {subject.name}
                                <Row>
                                    <Col>
                                        <ProgressBar 
                                            variant={countProgress(subject) >= 70 ? 'success' : countProgress(subject) >= 30 ? 'warning' : 'secondary'} 
                                            now={countProgress(subject)} 
                                            label={`${countProgress(subject)}%`}
                                            />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {active === subject.name && 
                            <Row>
                                <Col>
                                    {Array.from(Array(subject.target).keys()).map(target => {
                                        return (
                                            <Button 
                                                className='unrounded-button'
                                                key={target} 
                                                variant='outline-success'
                                                size='sm'
                                                style={{width:'3rem'}} 
                                            >{target+1}</Button>
                                        )
                                    })}
                                </Col>
                            </Row>
                        }
                    </div>
                )
            })}
        </Container>
    )
}

export default SubjectsMainScreen