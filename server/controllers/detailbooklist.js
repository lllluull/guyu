// axios.get(`https://m.douban.com/rexxar/api/v2/elessar/subject/${item}`)
const axios = require('axios')
module.exports = async (ctx) => {
    let id = ctx.request.query.bookid
    let idlist = JSON.parse(id)
    let book = []
    async function getall (vals) {
        return Promise.all(vals.map(v => axios.get(`https://m.douban.com/rexxar/api/v2/elessar/subject/${v}`)))
    }
    book = await getall(idlist)
    let booklist = JSON.stringify(book.map(v => v.data))
    ctx.state.data = {
        message: booklist
    }
}
