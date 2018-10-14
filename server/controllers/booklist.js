const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let page = ctx.request.query.page
    let size = 6
    const info = await mysql('books')
                      .select('books.*', 'cSessionInfo.user_info')
                      .limit(size)
                      .offset(Number(page) * size)
                      .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id ')
    if (info) {
        ctx.state.data = {
            message: info
        }
    } else {
        ctx.state.data = {
            code: -1,
            message: '获取失败'
        }
    }
}
