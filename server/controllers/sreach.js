const axios = require('axios')
module.exports = async(ctx) => {
    const {input} = ctx.request.body
    if (input) {
        try {
            const info = await axios.get(`https://api.douban.com/v2/book/search?q=${encodeURI(input)}`)
            ctx.state.data = {
                message: JSON.stringify(info.data)
            }
        } catch (e) {
            console.log(e)
        }
    }
}
