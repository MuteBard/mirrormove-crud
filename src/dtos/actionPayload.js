const { assertString, assertNumber, assertBoolean, assertNotNull, assertNotEmptyStr} = require('../util/assertions')

function setCreateActionPayload(p) {

    assertNotNull(p.name, 'name');
    assertString(p.name, 'name');
    assertNotEmptyStr (p.name, 'name');
    assertString(p.description, 'description');
    assertBoolean(p.isHidden, 'isHidden');
    assertNumber(p.seconds, 'seconds');
    assertString(p.token, 'token');
    
    const payload = {
        name: p.name,
        is_hidden: false,
        description_: p.description,
        created_at: Date.now(),
        updated_at: Date.now(),
        seconds: p.seconds,
        token: p.token
    };

    return payload;
}

function setPatchActionPayload(p) {
    const payload = {};

    assertNotNull(p.id, 'id')
    assertString(p.name, 'name');
    assertNotEmptyStr (p.name, 'name');
    assertString(p.String, 'description');
    assertBoolean(p.isHidden, 'isHidden');
    assertNumber(p.seconds, 'seconds');
    assertString(p.token, 'token');
    
    payload.id = p.id;
    payload.updated_at = Date.now(); 
    
    if (p.name !== null) {
        payload.name = p.name;
    }
    if (p.isHidden !== null) {
        payload.is_hidden = p.isHidden;
    }
    if (p.description !== null) {
        payload.description_ = p.description;
    }
    if (p.seconds!== null) {
        payload.seconds = p.seconds;
    }
    if (p.token !== null) {
        payload.token = p.token;
    }
    return payload;
}
exports.setCreateActionPayload = setCreateActionPayload;
exports.setPatchActionPayload = setPatchActionPayload;