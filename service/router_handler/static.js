const path = require('path')
const multiparty = require('multiparty')
var url = 'http://127.0.0.1:8080/static/tb_image_share_1681203459399.jpg'
// 获取商品信息列表的处理函数
exports.setImg = (req, res) => {
  let url = path.join(__dirname, '../public/static')
  let form = new multiparty.Form()
  form.uploadDir = url
  // form.keepExtensions=true;   //是否保留后缀
  form.parse(req, function (err, fields, files) {
    //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
    // console.log(fields, files)
    if (err) {
      res.json({
        status: '1',
        msg: '上传失败！' + err
      })
    } else {
      res.json({
        status: '0',
        msg: '上传成功！',
        imgSrc: files.image
      })
      var imgUrl = files.file[0].path
      console.log(typeof imgUrl)
      imgUrl = imgUrl.split(/[\\/]/)
      imgUrl = imgUrl[imgUrl.length - 1]

      module.exports.imgUrl = imgUrl
    }
  })
}
