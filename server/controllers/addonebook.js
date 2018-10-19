// 添加一本书到书单
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let bookid = ctx.request.query.bookid
    let openid = ctx.request.query.openid
    let title = ctx.request.query.title
    let booknametmp = ctx.request.query.bookname
    console.log(bookid)
    let {count, bookids, bookname} = await mysql('booklist').select('*').where('title', title).where('openid', openid).first()
    if (bookids.includes(bookid)) {
        ctx.state.data = {
            message: `该书已存在`
        }
    } else {
        count = count + 1
        bookids = bookids + ',' + bookid
        bookname = bookname + ',' + booknametmp
        console.log(count, bookids)
        try {
            await mysql('booklist').update({'count': count, 'bookids': bookids, 'bookname': bookname}).where('title', title).where('openid', openid)
            ctx.state.data = {
                message: '添加成功'
            }
        } catch (e) {
            ctx.state.data = {
                message: '添加失败' + e
            }
        }
    }
}
