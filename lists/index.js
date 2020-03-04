const requireDirectory = require('require-directory');
const lists = requireDirectory(module);
module.exports = (keystone, options) => Object.entries(lists).forEach(([key,list]) => list(keystone, options));