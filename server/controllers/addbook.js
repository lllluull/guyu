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
        const bookinfo = await axios.get(`https://api.douban.com/v2/book/isbn/${isbn}`)
        const rate = bookinfo.data.rating.average
        const {title, publisher, alt, image, pubdate, summary, price, author_intro} = bookinfo.data
        const tags = bookinfo.data.tags.map(v => {
            return `${v.name},${v.count}`
        }).join(',')
        const author = bookinfo.data.author.join(',')
        try {
            await mysql('books').insert({isbn, openid, title, publisher, alt, image, pubdate, rate, summary, price, tags, author, author_intro})
            ctx.state.data = {
                message: `${title}添加成功`
            }
        } catch (e) {
            ctx.state = {
                message: `新增失败, ${e.sqlMessage}`
            }
        }
    }
}
