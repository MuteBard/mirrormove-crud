
function assertNotNull(arg, key) {
    if ( arg === null ) throw new Error(`${key} cannot be null`)
}

function assertString(arg, key) {
    if ( arg != null && typeof arg !== 'string') throw new Error(`${key} is not a string value: ${arg}`)
}

function assertNotEmptyStr(arg, key) {
    if ( arg === '') throw new Error(`${key} cannot be empty ${arg}`)
}

function assertNumber(arg, key) {
    if ( arg != null && typeof arg !== 'number') throw new Error(`${key} is not a number value: ${arg}`)
    if ( Number.isNaN(arg)) throw new Error(`${key} is not a number value: ${arg}`)
}

function assertBoolean(arg, key) {
    if ( arg != null && typeof arg !== 'boolean' ) throw new Error(`${key} is not a boolean value: ${arg}`)
}

function assertList(arg, key) {
    if ( arg != null && 
        typeof arg !== 'object' && 
        Array.isArray(arg)) throw new Error(`${key} is not a List: ${arg}`)
}

exports.assertNotNull = assertNotNull;
exports.assertString = assertString;
exports.assertNotEmptyStr = assertNotEmptyStr;
exports.assertNumber = assertNumber;
exports.assertBoolean = assertBoolean;
exports.assertList = assertList;