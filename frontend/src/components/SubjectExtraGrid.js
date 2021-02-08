import React from 'react'
import { Button } from 'react-bootstrap'

const SubjectExtraGrid = ({ data, progress, action, disabled }) => {
    return (
        data.map((subject) => {
            return(
                <Button
                    key={subject.name}
                    id={subject.name}
                    size='sm'
                    className='mr-1 mb-1'
                    variant={progress.includes(subject.name) ? 'success' : 'outline-success'}
                    onClick={action}
                    disabled={disabled}
                >
                    {subject.name} 
                </Button>
            )
        })
    )
}

SubjectExtraGrid.defaultProps = {
    disabled: false,
}

export default SubjectExtraGrid
