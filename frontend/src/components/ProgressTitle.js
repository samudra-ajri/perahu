import React from 'react'
import { Row, Col, ProgressBar } from 'react-bootstrap'


const ProgressTitle = ({ title, count }) => {
    return (
        <>
            <strong>{title}</strong>
            <Row>
                <Col>
                    <ProgressBar
                        variant={count >= 70 ? 'success' : count >= 30 ? 'warning' : 'secondary'} 
                        now={count} 
                        label={`${count}%`}
                    />
                </Col>
            </Row>
            <hr />
        </>
    )
}

export default ProgressTitle
