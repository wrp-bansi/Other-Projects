const request = require('request')


const allCommonModules = {
  generateAlphNumricString: function (digit) {
    const length = digit
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      result += chars[randomIndex]
    }

    return result
  },

  getPaginationParams: function (requestedParams) {
    const defaultPerPage = parseInt(global.env.DEFAULT_PER_PAGE)
    const maxPerPage = parseInt(global.env.MAX_PER_PAGE)

    const currentPage = parseInt(requestedParams.currentPage) || 1
    const perPage =
      parseInt(requestedParams.perPage) < maxPerPage
        ? parseInt(requestedParams.perPage)
        : defaultPerPage

    const offset = (currentPage - 1) * perPage
    return {offset, perPage, currentPage}
  },

  callMicroServiceApi: (method, url, body, headers) => {
    const options = {
      method,
      url,
      headers,
      body: JSON.stringify(body),
    }

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          resolve({error: true, msg: error})
        } else {
          resolve(JSON.parse(response.body))
        }
      })
    })
  },
}

module.exports = {...allCommonModules}
