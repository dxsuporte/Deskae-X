import Ws from 'App/Services/Ws'

Ws.boot()

interface Message {
    userId: number,
    userOutId: number,
    message: string,
}

const messages: Message[] = []

Ws.io.on('connection', (socket) => {
    console.log('Usuário Conectado ' + socket.id)

    socket.emit('news', { hello: 'world' })

    socket.emit('previousMessages', messages)

    socket.on('disconnect', () => {
        console.log('Usuário Desconectado');
    })

    socket.on('sendMessage', (date) => {
        messages.push({ ...date })
    });

})