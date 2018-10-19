const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let bookid = ctx.request.query.bookid
    const readed = 1
    try {
        const info = await mysql('books').update({'readed': readed}).where('bookid', bookid)
        ctx.state.data = {
            message: '标记成功'
        }
    } catch (e) {
        ctx.state.data = {
            message: '标记失败' + 'e'
        }
    }
}
