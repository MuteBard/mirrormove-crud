
const { Op, synchronize} = require('./client');
const { Action } = require('../models/actions');

async function search(args) {
    let where = {
        is_hidden: !args.isHidden ? false : true
    };

    if (args.name) {
        where.name = { [Op.like]: `%${args.name}%` };
    }

    if (args.description) {
        where.description_ = { [Op.like]: `%${args.description}%` };
    }

    let order = [['updated_at', 'DESC']];

    switch (args.orderBy) {
        case 'NAME':
            order = [['name', args.sortOrder]];
            break;
        case 'SECONDS':
            order = [['seconds', args.sortOrder]];
            break;
        case 'CREATEDAT':
            order = [['created_at', args.sortOrder]];
            break;
        case 'UPDATEDAT':
            order = [['updated_at', args.sortOrder]];
            break;
    }

    try {
        
        const actions = await Action.findAll({
            where,
            order
        });
        return actionMapper(actions)
    } catch (error) {
        console.error('Error searching actions:', error);
        throw error;
    }
};


async function byId(id) {
    try {
        const action = await Action.findByPk(id);
        return actionMapper(action)
    } catch (error) {
        console.error('Error finding action by primary key:', error);
        throw error;
    }
}


async function byName(name){
    try {
        const action = await Action.findOne({
            where: { name }
        });
        return actionMapper(action)
    } catch (error) {
        console.error('Error finding action by name:', error);
        throw error;
    }
}

async function create(payload){
    try {
        const action = await Action.create(payload);
        const mappedAction = actionMapper(action)
        return mappedAction;
    } catch (error) {
        console.error('Error creating action:', error);
        throw error;
    }
}

async function patch(payload){
    try {
        const existingAction = await Action.findByPk(payload.id);
        if (!existingAction) {
            console.error('Action not found', error);
            return {}
        }

        await update(existingAction, payload)
        const updatedAction = await Action.findByPk(payload.id);

        const mappedAction = actionMapper(updatedAction.dataValues)
        return mappedAction;
    } catch (error) {
        console.error('Error creating action:', error);
        throw error;
    }
}


async function hide(id){
    try {
        const existingAction = await Action.findByPk(id);
        if (!existingAction) {
            console.error('Action not found', error);
            return {}
        }

        await update(existingAction, {id, is_hidden: true})
        const updatedAction = await Action.findByPk(id);

        const mappedAction = actionMapper(updatedAction.dataValues)
        return mappedAction;
    } catch (error) {
        console.error('Error creating action:', error);
        throw error;
    }
}

async function update(existing, changes) {
    if (!!changes.name) {
        existing.dataValues.name = changes.name;
    }
    if (!!changes.description_) {
        existing.dataValues.description_ = changes.description_;
    }
    if (!!changes.seconds) {
        existing.dataValues.seconds = changes.seconds;
    }
    if (!!changes.token) {
        existing.dataValues.token = changes.token;
    }
    if (changes.is_hidden !== existing.dataValues.is_hidden) {
        existing.dataValues.is_hidden = changes.is_hidden;
    }

    existing.dataValues.updated_at = changes.updated_at; 

    await Action.update(existing.dataValues, {
        where: {id: changes.id}
    })
}

function actionMapper(input) {
    const actions = Array.isArray(input) ? input : [input];
    return actions.map((a) => {
        const action = {};
        action.id = a.id;
        action.name = a.name;
        action.isHidden = a.is_hidden;
        action.description = a.description_;
        action.createdAt = a.created_at;
        action.updatedAt = a.updated_at;
        action.seconds = a.seconds;
        action.token = a.token;
        return action;
    });
}

exports.search = search;
exports.byId = byId;
exports.byName = byName;
exports.create = create;
exports.patch = patch;
exports.hide = hide;