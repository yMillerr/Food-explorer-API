class UserRepositoryInMemory {
  users = [
    {
      name: 'Tester Testing',
      email: 'tester@email.com',
      password: '$2a$10$PnReSg9CB6ARrXaBFdyXWOPWoWwV20Em9qRK9lafvDcaEpQJQmU8u' // password: 123
    }
  ]

  create({ email, name, password}) {
    const user = {
      id: Math.floor(Math.random() * 1000 + 1),
      email,
      name,
      password
    }

    this.users.push(user)

    return user
  }

  findUserByEmail(email){
    return this.users.find(user => user.email === email)
  }
  
}

module.exports = UserRepositoryInMemory