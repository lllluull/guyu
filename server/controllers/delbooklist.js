// 删除一个书单
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
    let id = ctx.request.query.id

    try {
        await mysql('booklist').where('id', id).del()
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
