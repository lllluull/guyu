const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let id = ctx.request.query.bookid
    let count = await mysql('books').select('count').where('id', id)
    count = count[0].count + 1
    await mysql('books').update({'count': count}).where('id', id)
    let info = await mysql('books')
                        .select('books.*', 'cSessionInfo.user_info')
                        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id ')
                        .where('id', id).first()
    console.log(info)
    if (info) {
        ctx.state.data = {
            message: info
        }
    } else {
        ctx.state.data = {
            message: '获取数据失败'
        }
    }
}
