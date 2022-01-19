const axios = require('axios')

const hitElastic = async ({ url, query }) => {
  console.log(`Hitting Elastic to: ${url}`)
  console.log(JSON.stringify(query))

  const result = {}
  
  try {
    // OMG GET with body - interesting Elastic :) Seems possible to switch to POST, read more. Refactor.
    const { data } = await axios.get(url, {
      data: query
    })
    // Okay, with POST also working:
    // const { data } = await axios.post(url, query)

    result.data = data
  } catch(e) {
    console.log('Error during call to Elastic')
    result.error = `Error from call to Elastic: ${e.message}`
  }

  return result;
}

const getSuggestedLines = async (searchText) => {
  const query = {
    query: {
      match: {
        text_entry: searchText
      }
    }
  }
  const url = 'http://localhost:9200/shakespeare/_search?pretty'

  return hitElastic({ url, query })
}

module.exports = {
  getSuggestedLines
}