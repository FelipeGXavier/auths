const Redis = require('./src/redis');
const app = require('./src/config');
const bcrypt = require('bcrypt');

bcrypt.hash('teste', 10, function(err, hash) {
    Redis.set('felipe@teste.com', hash);    
});

app.listen(3000);