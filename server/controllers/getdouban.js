const axios = require('axios')
module.exports = async(ctx) => {
    let page = ctx.request.query.page
    function jsonp (item) {
        return new Promise((resolve, reject) => {
            resolve(item)
        })
    }
    const res = await axios.get(`https://m.douban.com/rexxar/api/v2/subject_collection/book_fiction/items?os=ios&callback=jsonp&start=${page}&count=10&loc_id=0&_=1539069266537`,
        {
            headers: {
                'Referer': 'https://m.douban.com/book/'
            }
        }
       )
    const res1 = res.data.substring(1)
    const res2 = await eval(res1)
    ctx.state.data = {
        message: res2
    }
}
