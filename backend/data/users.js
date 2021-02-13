import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    birthdate: new Date(Date.UTC(Number(1996), Number(3)-1, Number(10))),
    klp: 'mru',
    sex: 'male',
    isMuballigh: true,
    isAdmin: true
  }
]

export default users