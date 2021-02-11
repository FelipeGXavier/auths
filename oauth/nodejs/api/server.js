const Redis = require('./src/redis');
const app = require('./src/config');

Redis.set('teste', JSON.stringify({message: 'Teste'}));

app.get('/ping', (req, res) => {
    Redis.get('teste').then(result => res.send(result));
});

app.listen(3000);