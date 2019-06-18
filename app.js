var port = process.env.port || 3000;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var http = require('http').Server(app);
const io = require('socket.io')(http);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat', (req,res)=>{
    res.render('chat')
});

let users = {};

io.on('connection', (socket)=>{
    
 

    socket.on('login', (name)=>{
        users[socket.id] = name;
        socket.broadcast.emit('message', {
            from:"Server",
            message:`${name} is connected `
        })
       
    })


    socket.on('message', (message)=>{
        io.emit('message', {
            from : users[socket.id],
            message: message
        })
       
    })

    socket.on('disconnect', ()=>{
        console.log('disconnect: ' + socket.id)
    });
});



http.listen(port, console.log(`connected to  ${port} `))
