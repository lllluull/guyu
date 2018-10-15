const axios = require('axios')
const {mysql} = require('../qcloud')
module.exports = async(ctx) => {
    const {isbn, openid} = ctx.request.body
    if (isbn && openid) {
        const findisbn = await mysql('books').select().where('isbn', isbn)
        if (findisbn.length) {
            ctx.state.data = {
                message: '该书已存在'
            }
            return
        }
        const bookinfo = await axios.get(`https://api.douban.com/v2/book/search?q=${encodeURI(isbn)}`)
        if (!bookinfo.data.books[0].rating) {
            ctx.state.data = {
                message: `找不到该书`
            }
        }
        const rate = bookinfo.data.books[0].rating.average
        const {title, publisher, alt, image, pubdate, summary, price, author_intro} = bookinfo.data.books[0]
        const tags = bookinfo.data.books[0].tags.map(v => {
            return `${v.name}${v.count}`
        }).join(',')
        const bookid = bookinfo.data.books[0].id
        const author = bookinfo.data.books[0].author.join(',')
        try {
            await mysql('books').insert({isbn, openid, title, publisher, alt, image, pubdate, rate, summary, price, tags, author, author_intro, bookid})
            ctx.state.data = {
                message: `${title}添加成功`
            }
        } catch (e) {
            console.log(e)
            ctx.state.data = {
                message: `新增失败, ${e.sqlMessage}`
            }
        }
    }
}
