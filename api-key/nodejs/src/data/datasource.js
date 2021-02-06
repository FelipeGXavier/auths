class Datasource {
    
  constructor() {
    this.collections = [];
  }

  has(key) {
    return Object.entries(this.collections).includes(key);
  }

  get(key) {
    return this.collections[key];
  }

  put(key, val) {
    this.collections[key] = val;
  }
}

module.exports = Datasource;
