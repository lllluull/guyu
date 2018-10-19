// 新建书单
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let bookids = ctx.request.query.bookid
    let openid = ctx.request.query.openid
    let image = ctx.request.query.image
    let title = ctx.request.query.title
    let bookname = ctx.request.query.bookname
    let count = 1
    const info = await mysql('booklist').select('*').where('title', title)
    if (info.length) {
        ctx.state.data = {
            message: `${title}书单已存在`
        }
    } else {
        try {
            await mysql('booklist').insert({bookids, openid, title, count, image, bookname})
            ctx.state.data = {
                message: `${title}书单添加成功`
            }
        } catch (e) {
            console.log(e)
            ctx.state.data = {
                message: `新增失败, ${e.sqlMessage}`
            }
        }
    }
}
