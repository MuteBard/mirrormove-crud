const { setMoveApiArguments } = require('../dtos/moveApiArguments');
const { setCreateMovePayload, setPatchMovePayload } = require('../dtos/movePayload')
const { assertNumber } = require('../util/assertions')
const moveRepository = require('../repositories/moveRepository')

async function search(req, res, next) {
    try {
        const args = setMoveApiArguments(req.query)

        const data = await moveRepository.search(args);
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function getById(req, res, next) {
    try {
        const id = Number(req.params.id);
        assertNumber(id, 'id')
        const data = await moveRepository.byId(id);
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function getByName(req, res, next) {
    try {
        const { name } = req.params;
        const data = await moveRepository.byName(name);
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function create(req, res, next) {
    try {
        const payload = setCreateMovePayload(req.body);
        const data = await moveRepository.create(payload)
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function patch(req, res, next) {
    try {
        const payload = setPatchMovePayload(req.body);
        const data = await moveRepository.patch(payload)
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        if (Number(id) <= 0) throw new Error(`Invalid Id ${id} provided`)
        const data = await moveRepository.hide(id);
        respond(res, data);
    } catch (err){
        next(err)
    }
}

function respond(res, response, next){
    res.send({
      data: response,
      error: null,
    });
}


exports.search = search;
exports.getById = getById;
exports.getByName = getByName;
exports.create = create;
exports.patch = patch;
exports.remove = remove;