const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("UserCreateService", () => {
   this.userCreateService = null

  beforeEach(() => {
    const userRepository = new UserRepositoryInMemory()
    this.userCreateService = new UserCreateService(userRepository)
  })
 
  it("user should be create", async () => {
    
    const user = {
      name: 'Tester Testing',
      email: 'teste@email.com',
      password: '123'
    }

    const userCreated = await this.userCreateService.execute(user)

    expect(userCreated).toHaveProperty('id')
  })

  it("user not should be create with exist email", async () => {
    const user1 = {
      name: 'Tester Testing',
      email: 'teste@email.com',
      password: '123'
    }

    const user2 = {
      name: 'Test',
      email: 'teste@email.com',
      password: '456'
    }

    await this.userCreateService.execute(user1)

    expect(async () => {
      await this.userCreateService.execute(user2)
    }).rejects.toEqual(new AppError('Esse email já está em uso!'))

  })
})