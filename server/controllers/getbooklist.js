// 获取书单列表
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let openid = ctx.request.query.openid
    try {
        const info = await mysql('booklist').select('*').where('openid', openid)
        ctx.state.data = {
            message: info
        }
    } catch (e) {
        console.log(e)
        ctx.state.data = {
            message: `获取数据失败, ${e.sqlMessage}`
        }
    }
}
