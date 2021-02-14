import React from 'react'
import { Button } from 'react-bootstrap'

const SubjectMainGrid = ({ data, progress, action, disabled }) => {
    return (
        data.map(target => {
            return (
                <Button
                    key={target} 
                    id={target+1}
                    size='sm'
                    className='unrounded-button'
                    variant={progress.includes(String(target+1)) ? 'success' : 'outline-success'}
                    onClick={action}
                    disabled={disabled}
                >{target+1}</Button>
            )
        })
    )
}

SubjectMainGrid.defaultProps = {
    disabled: false,
}

export default SubjectMainGrid
