var request = require('request')
var allCommanModules = {
  generateAlphNumricString: function (digit) {
    const length = digit
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''

    for (let i = 0; i < length; i++) {
      const random_index = Math.floor(Math.random() * chars.length)
      result += chars[random_index]
    }

    return result
  },

  getPaginationParams: function (requested_params) {
    const default_per_page = parseInt(global.env.DEFAULT_PER_PAGE)
    const max_per_page = parseInt(global.env.MAX_PER_PAGE)

    let current_page = parseInt(requested_params.current_page) || 1
    let per_page =
      parseInt(requested_params.per_page) < max_per_page
        ? parseInt(requested_params.per_page)
        : default_per_page

    const offset = (current_page - 1) * per_page
    return { offset, per_page, current_page }
  },

  // callMicroServiceApi: (method, url, body, headers) => {
  //   const options = {
  //     method,
  //     url,
  //     headers,
  //     body: JSON.stringify(body),
  //   }

  //   return new Promise((resolve, reject) => {
  //     request(options, (error, response, body) => {
  //       if (error) {
  //         resolve({ error: true, msg: error })
  //       } else {
  //         resolve(JSON.parse(response.body))
  //       }
  //     })
  //   })
  // },
}

module.exports = allCommanModules
