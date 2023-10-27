const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class SessionCreateService {

  constructor(userRepository){
    this.userRepository = userRepository
  }

  async execute({ email, password}){
    const user = await this.userRepository.findUserByEmail(email)

    if (!user) {
      throw new AppError('Email e/ou senha incorreto(a)')
    }

    const thePasswordIsCorret = await compare(password, user.password)

    if (!thePasswordIsCorret) {
      throw new AppError('Email e/ou senha incorreto(a)')
    }
    const { expiresIn, secret } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return {
      user:{
        id: user.id,
        admin: user.admin,
        name: user.name,
        email: user.email
      },
      token
    }
  }
}

module.exports = SessionCreateService