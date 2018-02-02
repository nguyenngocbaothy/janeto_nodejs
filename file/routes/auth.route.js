var router = require('express').Router();
var fs = require('fs');
var path = require('path');

router.post('/login', getLogin);

module.exports = router;

function getLogin(req, res) {
    var name = req.body.name;
    var password = req.body.password;

    fs.readFile(path.join(__dirname, "../" + "users.json"), 'utf8', function(err, data) {
        var list = JSON.parse(data);
        var user;
        for(var i=0; i<list.length; i++){
            if(list[i].name == name && list[i].password == password){
                user = list[i];
            }
        }

        if(user){
            res.json(user);
        } else {
            res.status(400);
            res.json({
                message: 'Name or password is incorrect'
            })
        }

    });
}