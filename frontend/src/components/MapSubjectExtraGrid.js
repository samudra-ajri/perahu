import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const MapSubjectExtraGrid = ({ data, progress, userCount }) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props} people
        </Tooltip>
    )

    return (
        data.map((subject) => {
            return(
                <OverlayTrigger
                    key={subject.name}
                    placement='top'
                    overlay={renderTooltip(progress[subject.name])}
                >
                    <Button
                        key={subject.name}
                        id={subject.name}
                        size='sm'
                        className='mr-1 mb-1'
                        style={{
                            border: 'none',
                            backgroundColor: progress[subject.name]/(userCount+0.00001) >= 0.4 
                                ? `rgba(86,204,157,${progress[subject.name]/(userCount+0.0001)})`
                                : `rgba(243,150,154,${1-(progress[subject.name]/(userCount+0.00001))})`
                        }}
                    >
                        {subject.name} 
                    </Button>
                </OverlayTrigger>
            )
        })
    )
}

export default MapSubjectExtraGrid
