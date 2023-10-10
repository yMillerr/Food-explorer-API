require('express-async-errors')

const express = require('express')

const AppError = require('./utils/AppError')
const routes = require('./routes')
const dbConnection = require('./database/sqlite')
const uploadConfig = require("./configs/upload")

const cors = require('cors')

const app = express()

app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))
app.use(express.json())
app.use(cors())
app.use(routes)

dbConnection()

app.use((error, resquest, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
      status: error.statusCode,
    })
  }

  console.error(error)

  return response.status(400).json({
    message: 'Error internal server',
    status: 400,
  })
})

const PORT = 3333

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
