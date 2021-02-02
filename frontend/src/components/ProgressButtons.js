import React from 'react'
import { Row, Button } from 'react-bootstrap'
import Loader from './Loader'


const ProgressButtons = ({ finishAction, resetActoin, loading }) => {
    return (
        <Row className='ml-auto'>
            <Button variant='outline-secondary' onClick={resetActoin} size='sm' className='mr-2'>Reset</Button>
            <Button variant='success' size='sm' onClick={finishAction} className='mr-2 px-5'>Hatam</Button>
            {loading && <Loader size='sm' />}
        </Row>
    )
}

export default ProgressButtons
