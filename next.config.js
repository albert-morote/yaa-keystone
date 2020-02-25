// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass({
    env: {
        'REACT_APP_PORT': '3000'
    }
})
