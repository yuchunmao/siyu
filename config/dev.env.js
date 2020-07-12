var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
	
	  BASE_API: '"http://39.100.113.191:6300"'
})
