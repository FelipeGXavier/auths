class Datasource {

  constructor() {
    this.collections = [];
  }

  has(key) {
    return this.collections[key] != null;
  }

  get(key) {
    return this.collections[key];
  }

  put(key, val) {
    this.collections[key] = val;
  }
}

module.exports = Datasource;
