import React from 'react'
import { Row, Col, ProgressBar } from 'react-bootstrap'


const ProgressSubtitle = ({ title, count, active}) => {
    return (
        <>
            <span className='capitalize'>{title}</span> <i className={active === title ? 'fas fa-caret-down' : 'fas fa-caret-right'}></i>
            <Row>
                <Col>
                    <ProgressBar
                        variant={count >= 70 ? 'success' : count >= 30 ? 'warning' : 'secondary'} 
                        now={count} 
                        label={`${count}%`}
                    />
                </Col>
            </Row>
        </>
    )
}

export default ProgressSubtitle
