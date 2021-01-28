import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ size, pos }) => {
    return (
        <Spinner
            animation='grow'
            variant='primary'
            role='status'
            style={{
                width: size === 'sm' ? '30px' : '100px',
                height: size === 'sm' ? '30px' : '100px',
                margin: pos === 'auto' && 'auto',
                display: 'block',
            }}
        >
            <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader