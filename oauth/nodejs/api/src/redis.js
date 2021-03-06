const redis = require('redis');
const client = redis.createClient(6379, 'localhost', redis);

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

    static setWithExpire(key, value, time) {
        client.setex(key, time, value, redis.print);
    }

    static remove(key) {
        client.del(key);
    }

    static set(key, value) {
        client.set(key, value, redis.print);
    }
}

module.exports = Redis;