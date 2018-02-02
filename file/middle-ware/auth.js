var jwt = require('./../utils/jwt');
var fs = require('fs');
var path = require('path');

exports.auth = function () {
    return function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, function (err, decodedData) {
                if (err) {
                    res.status(401);
                    res.json({
                        message: 'Invalid Token'
                    });
                } else {
                    var name = decodedData.name;

                    fs.readFile(path.join(__dirname, "../" + "users.json"), 'utf8', function (err, data) {
                        if (err) {
                            res.status(401);
                            res.json({
                                message: 'Invalid Token'
                            });
                        } else {
                            var listUser = JSON.parse(data);
                            var user;
                            for (var i = 0; i < listUser.length; i++) {
                                if (listUser[i].name == name) {
                                    user = listUser[i];
                                }
                            }
                            if (user) {
                                req.user = user;
                                next();
                            } else {
                                res.status(401);
                                res.json({
                                    message: 'Invalid Token'
                                });
                            }
                        }
                    });
                }
            })
        } else {
            res.status(401);
            res.json({
                message: "Not Authorized"
            });
        }
    }
}
