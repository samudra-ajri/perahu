import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { calculateRank } from '../actions/subjectActions'


const CardRank = ({ user }) => {
    const [rankObj, setRankObj] = useState('')

    useEffect(()=> {
        setRankObj(calculateRank(user.poin))
    }, [user])

    return (
        <Card 
            className='text-center' 
            border="light" 
            style={{ 
                width: '13rem', 
                margin:'auto' 
            }}>
            <Card.Body>
                <Card.Title>Rank {rankObj.rank}</Card.Title>
                <Card.Text>
                    <i 
                        style={{ color: '#D5B645' }} 
                        className='fas fa-star'
                    ></i>{' '}
                    <small> 
                        Poin: {user.poin}
                    </small>
                </Card.Text>
            </Card.Body>
            <Card.Img variant='bottom' src={rankObj.img} />
        </Card>
    )
}

export default CardRank
