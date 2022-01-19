const express = require('express')
const linesRoute = require('./routes/linesRoute')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome'
  })
})

app.use('/lines', linesRoute)

const PORT = 5000
app.listen(PORT, console.log(`App is running on port ${PORT}`))
