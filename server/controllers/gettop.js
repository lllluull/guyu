const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let info = await mysql('books')
                        .select('*')
                        .orderBy('count', 'desc')
                        .limit(6)
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
