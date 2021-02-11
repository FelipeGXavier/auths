const Redis = require('./redis');
const bcrypt = require('bcrypt');

module.exports = async function(req, res, next) {
    const header = req.header('Authorization') || '';
    const credentials = Buffer.from(header, 'base64').toString().split(':');
    if(credentials.length == 2) {
        const [email, password] = credentials; 
        const hashedPassword = await Redis.get(email);
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if(result){
                next();
            }else{
                res.sendStatus(403);        
            }
        });
    }else{
        res.sendStatus(403);
    }
};