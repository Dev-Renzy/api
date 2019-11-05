var jwt = require('jsonwebtoken');
module.exports.verify = (token, res) => {
    res.send({ verified: jwt.verify(token, 'secret') })
}