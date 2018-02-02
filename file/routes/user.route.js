var router = require('express').Router();
var fs = require('fs');
var path = require('path');
var auth = require('../middle-ware/auth');
var userController = require('../controller/user.controller');

//router.get('/', auth.auth(), getUsers);
router.post('/', createUser);

module.exports = router;

function getUsers(req, res, next) {
    //console.log(req.name);
    // fs.readFile(path.join(__dirname, "../" + "users.json"), 'utf8', function(err, data) {
    //     console.log(data);
    //     res.send(data);
    // });

    userController.getUsers().then(function(users) {
        res.send(users);
    }, function(err) {
        // res.status(500);
        // res.send('error');
        next(err);
    });
    
}

function createUser (req, res) {
    var newUser = req.body;
    userController.createUser(newUser)
    .then(function(user) {
        res.json(user);
    })
    .then(function (err) {
        next(err);
    })
}