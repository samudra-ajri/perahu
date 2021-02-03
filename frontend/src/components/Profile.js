import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/id';
import { ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const Profile = ({ user }) => {
    const [className, setClassName] = useState('')

    useEffect(() => {
        const calculateClass = () => {
            if (user.isMuballigh) {
                setClassName('Muballigh')
            } else {
                const year = moment().diff(moment(user.birthdate), 'year')
                
                if (year > 15) {
                    setClassName('Remaja')
                } else if (year > 12) {
                    setClassName('Pra Remaja')
                } else {
                    setClassName('Cabe Rawit')
                }
            }
        }
        
        calculateClass(user)
    }, [user])

    return (
        <div>
            <ListGroup variant='flush' >
                <ListGroup.Item>
                    <h2 style={{textAlign:'center'}}>{user.name} <LinkContainer to='/profile/edit'><small><i className='far fa-edit profile-edit'></i></small></LinkContainer></h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Birthdate:</strong> {moment(user.birthdate).locale('id').format('ll')}
                    </p>
                    <p>
                        <strong>Sex:</strong> {user.sex === 'l' ? 'male' : 'female'}
                    </p>
                    <p>
                        <strong>Klp:</strong> {user.klp && user.klp.toUpperCase()}
                    </p>
                    <p>
                        <strong>Class:</strong> {className}
                    </p>
                    <p>
                        <strong>Subjects:</strong> {(user.poin/2296*100).toFixed(2)}%
                    </p>
                </ListGroup.Item>
                
            </ListGroup>
        </div>
    )
}

export default Profile
