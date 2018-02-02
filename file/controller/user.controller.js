var fs = require('fs');
var path = require('path');
var User = require('../models/user.model');

module.exports = { 
    getUsers: getUsers,
    createUser: createUser
}

function getUsers() {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname, "../" + "users.json"), 'utf8', function(err, data) {
            if(err) {
                //reject(err);
                reject({ message: err.message })
            } else {
                resolve(data);
            }
        });
    });
}

function createUser(newUser) {
    var user = new User(newUser);
    return user.save()
    .then(function(user) {
        return Promise.resolve(user);
    })
    .catch(function(err) {
        return Promise.reject(err);
    });
}