const { orderByEnum } = require('./orderBy');
const { sortOrderEnum } = require('./sortOrder');
const { assertString, assertBoolean } = require('../util/assertions')

function setActionApiArguments(args) {
    const updatedArgs = {};

    assertString(args.name, 'name');
    assertBoolean(args.isHidden, 'isHidden');

    if (!!args.name) {
        updatedArgs.name = args.name;
    }
    if (!!args.isHidden) {
        updatedArgs.isHidden = args.isHidden;
    }
    
    updatedArgs.sortOrder = sortOrderEnum(args.sortOrder);
    updatedArgs.orderBy = orderByEnum(args.orderBy);

    return updatedArgs;
}

exports.setActionApiArguments = setActionApiArguments;