var model = require("../models/account")
var jwt = require('jsonwebtoken');

module.exports.login = (credentials, res) => {
    console.log(credentials);
    model.findOne((err, result) => {
        let token = { user: null };
        let error = true
        if (!err) {
            if (result) {
                token.user = result;
                error = false
            }
            res.send({ error: error, accessToken: jwt.sign(token, 'secret')})
        }
    })

}
// 
