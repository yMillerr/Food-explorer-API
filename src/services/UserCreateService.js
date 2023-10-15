const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UserCreate{
  constructor(userRepository){
    this.userRepository = userRepository
  }

  async execute({ email, name, password }){
    const checkUserExistWithEmail = await this.userRepository.findUserByEmail(email)

    if (checkUserExistWithEmail) {
      throw new AppError('Esse email já está em uso!')
    }

    const hashedPassword = await hash(password, 10)

    const userCreated = await this.userRepository.create({ email, name, password: hashedPassword})

    return userCreated
  }
}

module.exports = UserCreate