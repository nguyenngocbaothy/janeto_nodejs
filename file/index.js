var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var router = express.Router();
var userRouter = require('./routes/user.route');
var loginRouter = require('./routes/auth.route');
var errorHandler = require('./middle-ware/error-handler');
var db = require('./db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// app.get('/', function (req, res) {
//  res.send('Hello World');
// })

// app.get('/users', function (req, res) {
//     fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
//         console.log(data);
//         res.end(data);
//     });
// })

app.post('/users', function (req, res) {
    var newUser = req.body;

    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var list = JSON.parse(data);
        list.push(newUser);

        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(list), function (err, data) {
            if (err) {
                res.status(500);
                res.end('error');
            }
            else {
                res.send(list);
            }
        });
    });
})

app.put('/users/:id', function (req, res) {
    const id = req.params.id;
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var list = JSON.parse(data);
        list.forEach(element => {
            if (element.id == id) {
                //console.log(element);
                const { name, password, profession, id } = req.body;
                //console.log(name, password, profession, id);
                element.name = name;
                element.password = password;
                element.profession = profession;
                element.id = id;
                console.log('sua thanh cong');
            }
            else {
                console.log('khong tim thay');
            }
        });
        console.log(list);
        
        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(list), function (err, data) {
            if (err) {
                res.status(500);
                res.end('error');
            }
            else {
               res.send(list);
            }
        });
    });
    //res.send('put len thanh cong');
})
 
app.delete('/users/:id', function(req, res) {
    const id = req.params.id;
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var list = JSON.parse(data);
        const arr = list.filter(function (user) {
            return user.id != id;
        });
        console.log(arr);
        
        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(arr), function (err, data) {
            if (err) {
                res.status(500);
                res.end('error');
            }
            else {
               res.send(arr);
            }
        });
    });
    //res.send('delete da gui dc');
}); 

app.use('/users', userRouter);
app.use('/auth', loginRouter);
app.use(errorHandler.errorHandler());

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)
})