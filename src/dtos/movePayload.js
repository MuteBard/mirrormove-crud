const { assertString, assertNumber, assertBoolean, assertNotNull, assertList, assertNotEmptyStr } = require('../util/assertions')

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
    const payload = {};

    // assertNotNull(p.id, 'id')
    // assertString(p.name, 'name');
    // assertNotEmptyStr (p.name, 'name');
    // assertString(p.String, 'description');
    // assertBoolean(p.isHidden, 'isHidden');
    // assertNumber(p.seconds, 'seconds');
    // assertList(p.actionLoops, 'actionLoops');

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
    if (p.seconds !== null) {
        payload.seconds = p.seconds;
    }
    if (p.actionLoops !== null){
        // validateActionLoops(p.actionLoops)
        payload.actionLoops = p.actionLoops
    }
    
    return payload;
}


function validateActionLoops(actionLoops) {
    for (const al of actionLoops) {
        if (typeof al === 'object' && 'actionId' in al && 'loops' in al) {
            continue;
        } else {
            throw new Error(`ActionLoop provided was not valid`); 
        }
    }

    return true;
}
exports.setCreateMovePayload = setCreateMovePayload;
exports.setPatchMovePayload = setPatchMovePayload;