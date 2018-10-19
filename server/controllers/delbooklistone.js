 // 删除书单中的书
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let id = ctx.request.query.id
    let bookids = ctx.request.query.bookids
    let count = parseInt(ctx.request.query.count)
    let bookname = ctx.request.query.bookname
    console.log(bookids)
    try {
        await mysql('booklist').update({'bookids': bookids, 'count': count, 'bookname': bookname}).where('id', id)
        ctx.state.data = {
            message: `书单删除成功`
        }
    } catch (e) {
        console.log(e)
        ctx.state.data = {
            message: `删除失败, ${e.sqlMessage}`
        }
    }
}
