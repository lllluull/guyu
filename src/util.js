import config from './config'
export function get (url) {
  return request(url, 'GET')
}
export function post (url, data) {
  return request(url, 'POST', data)
}
export function showModal (title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false
  })
}
export function getLocation () {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        resolve(res)
      }
    })
  })
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

class BookDetail {
  constructor ({title, author, des, des1, imgUrl, publish, ratevalue, ratecount, tags, bookid}) {
    this.title = title
    this.author = author
    this.des = des
    this.des1 = des1
    this.imgUrl = imgUrl
    this.publish = publish
    this.ratevalue = ratevalue
    this.ratecount = ratecount
    this.tags = tags
    this.bookid = bookid
  }
}

function creatdes (bookinfo) {
  let desc = bookinfo.desc
  let ref = />([\s\S]*?)<\/div>/gi
  let out = ''
  if (desc) {
    out = ref.exec(desc)[1]
  }
  return out.split('\n')
}
function creattags (bookinfo) {
  let res = []
  bookinfo.tags.map(v => {
    res.push(v.name)
  })
  return res
}
export function createbookinfo (bookinfo) {
  return new BookDetail({
    title: bookinfo.title,
    author: bookinfo.extra.short_info.split('/')[0],
    des: creatdes(bookinfo),
    des1: creatdes(bookinfo).slice(0, 4),
    imgUrl: bookinfo.cover.large.url,
    publish: `${bookinfo.extra.short_info.split('/')[1]}/${bookinfo.extra.short_info.split('/')[2]}`,
    ratevalue: bookinfo.extra.rating_group.rating.value,
    ratecount: bookinfo.extra.rating_group.rating.count,
    tags: creattags(bookinfo),
    bookid: bookinfo.id
  })
}
