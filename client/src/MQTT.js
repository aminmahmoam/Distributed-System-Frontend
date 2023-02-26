function generateId(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
function mqtt(request, url, data, authenticated) {
  const ws = new WebSocket('ws://localhost:8082')
  const message = []
  ws.onopen = () => {
    const id = generateId(30)
    ws.send(JSON.stringify({ id: id, request: request, url: url, data: data, authenticated: authenticated }))
  }
  ws.onmessage = function (event) {
    message.push(JSON.parse(event.data))
    ws.close()
  }
  return message
}
export { mqtt as default }
