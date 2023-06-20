const knex = require('knex');
const NODE_ENV = process.env.NODE_ENV || 'development'
const config = require('../knexfile')

const db = knex(config[NODE_ENV]);

module.exports = db;