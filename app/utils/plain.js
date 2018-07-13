const _ = require('lodash');

function plain(response, options) {
    console.log('response', response);
    if (Array.isArray(response)) {
        return _.map(response, record => {
            record = record.toJSON();
            record = _.omit(record, _.get(options, 'exclude'));
            return record;
        });
    } else {
        return response.toJSON();
    }
}

module.exports = plain;