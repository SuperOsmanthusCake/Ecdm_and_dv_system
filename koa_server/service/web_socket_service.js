// 引入 WebSocket 服务器的对象
const WebSocket = require('ws')
const path = require('path')
const fileUtils = require('../utils/file_utils')
// 绑定的端口号是9998
const wss = new WebSocket.Server({
  port: 9998
})

module.exports.listen = () => {
  // 对客户端连接事件进行监听
  // client: 代表的是客户端的连接 socket 对象
  wss.on('connection', (client) => {
    console.log('有客户端连接成功了。。。')
    // 对客户端的连接对象进行 message 事件的监听
    // msg: 由客户端发给服务端数据
    client.on('message', async (msg) => {
      let payload = JSON.parse(msg)
      const action = payload.action
      if (action === 'getData') {
        console.log('客户端发送数据给服务端了' + msg)
        let filePath = '../data/' + payload.chartName + '.json'
        filePath = path.join(__dirname, filePath)
        const ret = await fileUtils.getFileJsonData(filePath)
        // 在服务端获取到数据的基础上，增加一个data的字段
        payload.data = ret
        client.send(JSON.stringify(payload))
      } else {
        // 原封不动的将数据返回给每一个客户端
        // wss.clients 表示所有客户端的连接
        wss.clients.forEach((client) => {
          client.send(msg)
        })
      }
      // 由服务端往客户端发送数据
      // client.send('你好 这里是后端的数据')
    })
  })
}
