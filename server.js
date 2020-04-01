'use strict'

const ejs = require('ejs');
const express = require('express')
const app = express();


// set view engine
app.engine('.html', ejs.__express);
app.set('view-engine', 'html');
// setting views folder
app.set("views", __dirname + '/views');

// set static folder path
app.use(express.static(__dirname + '/public'));


/* create server */
const http = require('https').createServer(app);
const port = 80;
const server = app.listen(port);

/* scokets */
const io = require('socket.io').listen(server);

/**
 * used socket io instead of inbuild event listners and handlers
 * 
 */
 
io.on("connection", socket=>{
    console.log('User ' + socket.id + ' connected, there are ' + io.engine.clientsCount + ' clients connected');

    socket.on("disconnect", ()=>{

        // client is removed dont update is status
        console.log(`Socket ${socket.id} disconnected.`);
    });

    /**
     * sending id to client
     * server will identify client only by that id 
     * 
     * when script restarted then new id will be issued to client
    */ 
    socket.emit('introduction', socket.id, io.engine.clientsCount);

    /**
     * listening to client events
     * 
    */
    socket.on('fromClient', (msg)=>{
        console.log("msg from client " + msg);
    });
});

app.get('/', (req, res)=>{
    // res.send('hello');
    res.render('index.html');
})