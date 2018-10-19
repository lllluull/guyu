const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let openid = ctx.request.body.openid
    let readed = ctx.request.body.read
    let info = {}
    if (readed === 2) {
        info = await mysql('books')
                      .select('books.*', 'cSessionInfo.user_info')
                      .where('openid', openid)
                      .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id ')
    } else {
        info = await mysql('books')
          .select('books.*', 'cSessionInfo.user_info')
          .where('openid', openid)
          .where('readed', readed)
          .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id ')
    }

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
