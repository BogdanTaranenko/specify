/* eslint-disable no-unused-expressions,import/no-mutable-exports */
let keys;
process.env.NODE_ENV === 'production' ? keys = require('./prod') : keys = require('./dev');

export default keys;
