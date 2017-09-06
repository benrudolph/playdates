const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.plugins.set('Environment', new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))))
environment.resolve = {
    alias: {
        'jquery': 'jquery/src/jquery'
    }
}

module.exports = environment
