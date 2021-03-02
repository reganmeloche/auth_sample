let value;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
    value = require('./prod');
} else {
    value = require('./dev');
}

module.exports = value;