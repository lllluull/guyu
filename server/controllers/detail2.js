const axios = require('axios')
module.exports = async (ctx) => {
    let id = ctx.request.query.bookid
    const info = await axios.get(`https://m.douban.com/rexxar/api/v2/elessar/subject/${id}`)
    ctx.state.data = {
        message: info.data
    }
}
