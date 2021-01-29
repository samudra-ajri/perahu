import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/id';
import { ListGroup } from 'react-bootstrap'

const Profile = ({ user }) => {
    const [className, setClassName] = useState('')

    useEffect(()=> {
        const calculateClass = () => {
            const year = moment().diff(moment(user.birthdate), 'year')
            if (year > 15) {
                setClassName('Remaja')
            } else if (year > 12) {
                setClassName('Remaja')
            } else {
                setClassName('Cabe Rawit')
            }
        }
        
        calculateClass(user)
    }, [user])

    return (
        <div>
            <ListGroup variant='flush' >
                <ListGroup.Item>
                    <h2 style={{textAlign:'center'}}>{user.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Lahir:</strong> {moment(user.birthdate).locale('id').format('ll')}
                    </p>
                    <p>
                        <strong>Klp:</strong> {user.klp && user.klp.toUpperCase()}
                    </p>
                    <p>
                        <strong>Kelas:</strong> {className}
                    </p>
                    <p>
                        <strong>Materi:</strong> {(user.poin/2208*100).toFixed(2)}%
                    </p>
                </ListGroup.Item>
                
            </ListGroup>
        </div>
    )
}

export default Profile
