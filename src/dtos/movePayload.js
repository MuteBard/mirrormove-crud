const { assertString, assertNumber, assertBoolean, assertNotNull, assertList, assertNotEmptyStr, exists} = require('../util/assertions')

function setCreateMovePayload(p) {

    assertNotNull(p.name, 'name');
    assertString(p.name, 'name');
    assertNotEmptyStr (p.name, 'name');
    assertString(p.description, 'description');
    assertBoolean(p.isHidden, 'isHidden');
    assertNumber(p.seconds, 'seconds');
    assertList(p.actionLoops, 'actionLoops');

    const payload = {
        name: p.name,
        is_hidden: false,
        description_: p.description,
        created_at: Date.now(),
        updated_at: Date.now(),
        seconds: p.seconds,
        actionLoops: p.actionLoops
    };

    return payload;
}

function setPatchMovePayload(p) {
    const payload = {
        is_hidden: false
    };

    assertNotNull(p.id, 'id')
    assertString(p.name, 'name');
    assertNotEmptyStr (p.name, 'name');
    assertString(p.String, 'description');
    assertBoolean(p.isHidden, 'isHidden');
    assertNumber(p.seconds, 'seconds');
    assertList(p.actionLoops, 'actionLoops');

    payload.id = p.id;
    payload.updated_at = Date.now(); 

    if (exists(p.name)) {
        payload.name = p.name;
    }
    if (exists(p.isHidden)) {
        payload.is_hidden = p.isHidden;
    }
    if (exists(p.description)) {
        payload.description_ = p.description;
    }
    if (exists(p.seconds)) {
        payload.seconds = p.seconds;
    }
    if (exists(p.actionLoops)){
        validateActionLoops(p.actionLoops)
        payload.actionLoops = p.actionLoops
    }
    
    return payload;
}

function validateActionLoops(actionLoops) {
    for (const al of actionLoops) {
        if (typeof al === 'object' && 'ActionId' in al && 'Loops' in al) {
            continue;
        } else {
            throw new Error(`ActionLoop provided was not valid`); 
        }
    }

    return true;
}
exports.setCreateMovePayload = setCreateMovePayload;
exports.setPatchMovePayload = setPatchMovePayload;