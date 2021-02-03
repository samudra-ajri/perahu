import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {
const dispatch = useDispatch()

const userList = useSelector((state) => state.userList)
const { loading, error, users } = userList

const userLogin = useSelector((state) => state.userLogin)
const { userInfo } = userLogin

const userDelete = useSelector((state) => state.userDelete)
const { success: successDelete } = userDelete

useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
        dispatch(listUsers())
    } else {
        history.push('/login')
    }
}, [dispatch, history, successDelete, userInfo])

const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
        dispatch(deleteUser(id))
    }
}

return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table hover responsive size='sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Klp</th>
                            <th>Sex</th>
                            <th>Class</th>
                            <th>Main</th>
                            <th>Extra</th>
                            <th>Memory</th>
                            <th>Active</th>
                            <th>Admin</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                        <tr key={user._id}>
                            <td>{i+1}</td>
                            <td>{user.name}</td>
                            <td>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </td>
                            <td>{(user.klp).toUpperCase()}</td>
                            <td>{user.sex === 'l' ? 'Male' : 'Female'}</td>
                            <td>Pra Remaja</td>
                            <td>70%</td>
                            <td>90.87%</td>
                            <td>50 %</td>
                            <td>
                                {user.isActive ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {user.isAdmin ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td style={{ backgroundColor:'#F8F9FA', textAlign:'center' }}>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                
                            </td>
                            <td style={{ backgroundColor:'#F3969A', textAlign:'center' }}>
                                <Button
                                    variant='secondary'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen