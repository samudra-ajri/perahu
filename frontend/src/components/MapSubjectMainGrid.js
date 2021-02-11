import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const MapSubjectMainGrid = ({ data, progress, userCount }) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props} people
        </Tooltip>
    );    

    return (
        data.map(target => {
            return (
                <OverlayTrigger
                    key={target}
                    placement='top'
                    overlay={renderTooltip(progress[target+1])}
                >
                    <Button
                        key={target} 
                        id={target+1}
                        size='sm'
                        className='unrounded-button'
                        style={{
                            width: '3rem',
                            border: 'none',
                            backgroundColor: progress[target+1]/userCount >= 0.4 
                                ? `rgba(86,204,157,${progress[target+1]/userCount})`
                                : `rgba(243,150,154,${1-(progress[target+1]/userCount)})`
                        }}
                    >
                        {target+1}
                    </Button>
                </OverlayTrigger>
            )
        })
    )
}

export default MapSubjectMainGrid
