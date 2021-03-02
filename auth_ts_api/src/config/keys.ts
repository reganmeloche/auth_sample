let value;
/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
    value = require('./prod').default;
} else {
    value = require('./dev').default;
}

export default value;