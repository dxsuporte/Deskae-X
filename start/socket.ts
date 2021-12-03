import Ws from 'App/Services/Ws'

Ws.boot()

Ws.io.on('connection', (socket) => {
    console.log('Usuário Conectado ' + socket.id)

    socket.on('disconnect', () => {
        console.log('Usuário Desconectado')
    })

    socket.on('join', function (data) {
      console.log(data)
      socket.join(data.email); // We are using room of socket io
    })

    socket.in('root@root.com').emit('new_msg', { msg: 'hello' })

})
