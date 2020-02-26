// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass({
    env: {
        'REACT_APP_PORT': '4545',
        'HOST':'http://0fb86412.ngrok.io'
    }
})
