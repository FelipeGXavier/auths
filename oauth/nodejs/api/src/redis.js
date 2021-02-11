const redis = require('redis');
const client = redis.createClient(6379, 'redis-app', redis);

client.on('error', (err) => console.log(err));

class Redis {

    static get(key){
        return new Promise((resolve, reject) => {
            client.get(key, function(err, data) {
                if(err) reject(err);
                resolve(data);
            });
        })
    }

    static set(key, value) {
        client.set(key, value, redis.print);
    }
}

module.exports = Redis;