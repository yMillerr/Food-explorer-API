const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")
const SessionCreateService = require("./SessionCreateService")

describe("SessionCreateService", () => {
  this.sessionCreateService = null 

  beforeEach(() => {
    const userRepository = new UserRepositoryInMemory()
    this.sessionCreateService = new SessionCreateService(userRepository)
  })

  it("The session must be created", async () => {
    const userLogin = {
      email: 'tester@email.com',
      password: '123'
    }

    const sessionCreated = await this.sessionCreateService.execute(userLogin)

    expect(sessionCreated).toHaveProperty('token')
    expect(sessionCreated).toHaveProperty('user')
  })

  it("If the email does not exist, the session should not be created", () => {
    const userLogin = {
      email: 'testing@email.com',
      password: '123'
    }

    expect(async () => {
      await this.sessionCreateService.execute(userLogin)
    }).rejects.toEqual(new AppError("Email e/ou senha incorreto(a)"))
  })

  it("If the password was incorrect, the session should not be created", () => {
    const userLogin = {
      email: 'testing@email.com',
      password: '123456'
    }

    expect(async () => {
      await this.sessionCreateService.execute(userLogin)
    }).rejects.toEqual(new AppError("Email e/ou senha incorreto(a)"))
  })
})