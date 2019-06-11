const path = require('path')


const ID = 'content-index'

exports.name = ID

exports.apply = (api, options = {}) => {
    // Plugin options
    options = Object.assign(
        {

        },
        options
    )




    api.browserApi.add(path.join(__dirname, 'saber-browser.js'))

    api.hooks.afterGenerate.tapPromise(ID, async () => {
    }
    )
}

    
