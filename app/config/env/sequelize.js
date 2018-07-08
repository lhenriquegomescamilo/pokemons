const environment = process.env.NODE_ENV;
module.exports = () => require(`./${environment}.env.js`);