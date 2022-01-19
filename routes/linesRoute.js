const { Router } = require('express')
const { getSuggestedLines } = require('../services/linesService')

const route = Router()

route.get('/', async (req, res) => {
  const { q: query } = req.query
  const searchText = query.trim()

  const { data, error } = await getSuggestedLines(searchText)
  
  if (data) {
    res.json(data)
  } else if (error) {
    res.status(400).json({message: `Got error: ${error}`})
  } else {
    throw new Error('Smth reeeeeeealy bad happened')
  }
})

module.exports = route