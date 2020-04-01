const socket = io();
socket.on('introduction', (id, clientCount)=>{
    console.log(id);
});

window.addEventListener('keydown', e => socket.emit('fromClient',e.key), false);

