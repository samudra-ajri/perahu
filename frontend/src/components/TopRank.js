import React from 'react'
import { Table } from 'react-bootstrap'

export const TopRank = ({ users }) => {
    return (
        <>
            <h5 style={{textAlign:'center'}} className='mt-3 pt-1 pb-4'>
                <i style={{ color: '#D5B645' }} 
                    className='fas fa-trophy'
                ></i> Top 5 Ranked
            </h5>
            <Table hover size='sm'> 
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gen</th>
                        <th>Poin</th>
                    </tr>
                </thead>

                {users.map((user, i) => {
                    return (
                        <tbody key={i}>
                            <tr>
                                <td>{i+1}</td>
                                <td>{user.name}</td>
                                <td><i style={{ color: '#D5B645' }} className='fas fa-star'></i> {user.poin}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
        </>
    )
}

export default TopRank
