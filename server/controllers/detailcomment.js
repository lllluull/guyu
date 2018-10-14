const axios = require('axios')
module.exports = async(ctx) => {
    let id = ctx.request.query.bookid
    let page = ctx.request.query.page
    const res = await axios.get(`https://m.douban.com/rexxar/api/v2/book/${id}/interests?count=4&order_by=hot&start=${page}&ck=&for_mobile=1`,
        {
            headers: {
                'Referer': 'https://m.douban.com/book/'
            }
        }
       )
    let res1 = JSON.stringify(res.data)
    ctx.state.data = {
        message: res1
    }
}
