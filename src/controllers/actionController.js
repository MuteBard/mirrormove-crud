const { setActionApiArguments } = require('../dtos/actionApiArguments');
const { setCreateActionPayload, setPatchActionPayload } = require('../dtos/actionPayload')
const actionRepository = require('../repositories/actionRepository')

async function search(req, res, next) {
    try {
        const args = setActionApiArguments(req.query)
        const data = await actionRepository.search(args);
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function getById(req, res, next) {
    try {
        const { id } = req.params;
        if (Number(id) <= 0) throw new Error(`Invalid Id ${id} provided`)
        const data = await actionRepository.byId(id);
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function getByName(req, res, next) {
    try {
        const { name } = req.params;
        const data = await actionRepository.byName(name);
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function create(req, res, next) {
    try {
        const payload = setCreateActionPayload(req.body);
        const data = await actionRepository.create(payload)
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function patch(req, res, next) {
    try {
        const payload = setPatchActionPayload(req.body);
        const data = await actionRepository.patch(payload)
        respond(res, data);
    } catch (err){
        next(err)
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        if (Number(id) <= 0) throw new Error(`Invalid Id ${id} provided`)
        const data = await actionRepository.hide(id);
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