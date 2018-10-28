const serverHost = 'localhost'
const serverPort = '4001'

module.exports = {
  host: serverHost,
  staticPort: 3001,
  port: serverPort,
  client: {
    fetchUrl: `http://${serverHost}:${serverPort}`
  }
}
