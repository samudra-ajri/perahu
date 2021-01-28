import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <Container fluid>
            <Row>
                <Col className='text-center py-3'>
                    <small>Copyrigth &copy; <strong>Perahu | </strong>Pemetaan Generasi Margahayu</small>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer
