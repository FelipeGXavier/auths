const express = require('express');
const bcrypt = require('bcrypt');
const Redis = require('./redis');

const router = express.Router();

router.post('/login', async (req, res) => {
    const {email, password} = req.body; 
    const hashedPassword = await Redis.get(email);
    bcrypt.compare(password, hashedPassword, function(err, result) {
        if(err || !result){
            return res.sendStatus(401);
        }
        if(result) {
            const buffer = Buffer.from(`${email}:${password}`);
            const basicCredentials = buffer.toString('base64');
            return res.json({basic: basicCredentials});
        }
    });
});

module.exports = router;