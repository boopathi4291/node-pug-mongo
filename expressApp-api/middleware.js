let jwt = require('jsonwebtoken');
const config = require('./config.js');

module.exports ={
    checkToken :function(req,res,next){
    var token = {token  : req.body.token || req.query.token || req.headers['x-access-token']};
    if (token.token) {
        jwt.verify(token.token, config.secretKey, function (err, decoded) {
            if (err) {
                res.send(res.json({ success: false, message: 'We are not able to verify the token!' }));
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        res.json({
            "success": false,
            "message": 'Please provide the token for verification!'
        });

    }

}
}