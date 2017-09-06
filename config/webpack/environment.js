const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.plugins.set('Environment', new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))))
environment.plugins.set(
    'Provide',
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        Tether: 'tether',
        tether: 'tether',
        'window.Tether': 'tether',
    })
)

environment.resolve = {
    alias: {
         jquery: 'jquery/src/jquery',
         tether: 'tether/dist/js/tether'
    }
}

module.exports = environment
