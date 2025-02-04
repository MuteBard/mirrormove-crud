const { Op, db } = require("./client");
const { Move } = require("../models/moves");
const { MoveAction } = require("../models/moves_actions");
const { Action } = require("../models/actions");

async function search(args) {
    let where = {
        'moves.is_hidden': !args.isHidden ? false : true,
    };

    if (args.name) {
        where['moves.name'] = `LIKE '%${args.name}%'`;
    }

    if (args.description) {
        where['moves.description_'] = `LIKE '%${args.description}%'`;
    }

    let order = `moves.updated_at DESC`;

    switch (args.orderBy) {
        case "NAME":
            order = `moves.name ${args.sortOrder}`;
            break;
        case "SECONDS":
            order = `moves.seconds ${args.sortOrder}`
            break;
        case "CREATEDAT":
            order = `moves.created_at ${args.sortOrder}`
            break;
        case "UPDATEDAT":
            order = `moves.updated_at ${args.sortOrder}`
            break;
    }
    try {
        const moves = await moveSelectQuery(where, order)
        const mappedMove = moveMapper(moves);
        return mappedMove;
    } catch (error) {
        console.error("Error searching move:", error);
        throw error;
    }
}

async function byId(id) {
    const moves = await moveSelectQuery({'moves.id': id}, null)
    const mappedMove = moveMapper(moves);
    return mappedMove;
}

async function byName(name) {
    const moves = await moveSelectQuery({'moves.name':name}, null)
    const mappedMove = moveMapper(moves);
    return mappedMove;
}

async function create(payload){
    const { actionLoops, ...moveData} = payload

    try {
        const newMove = JSON.parse(JSON.stringify(await Move.create(moveData)));
        const moveId = newMove.id;
        await Promise.all(actionLoops.map(async (al) => {
            const moveActionData = {
                action_id: al.ActionId,
                move_id: moveId,
                loops: al.Loops
            }
            await MoveAction.create(moveActionData);
        }))

        return byId(moveId);
    } catch (error) {
        console.error("Error creating move:", error);
        throw error;
    }
}

async function patch(payload){
    const { actionLoops, ...moveData} = payload
    const moveId = moveData.id;

    try {
        await Move.update(moveData, {
            where: { id: moveId } 
        })

        await MoveAction.destroy({
            where: {
                move_id : moveId
            }
        });

        await Promise.all(actionLoops.map(async (al) => {
            const moveActionData = {
                action_id: al.ActionId,
                move_id: moveId,
                loops: al.Loops
            }
            await MoveAction.create(moveActionData);
        }))
        return byId(moveId);

    } catch (error) {
        console.error("Error creating move:", error);
        throw error;
    }
}

async function hide(id) {
    try {
        const move = await Move.findByPk(id);
        if (!move) {
            console.error('Move not found');
            return null;
        }
        move.is_hidden = 1;
        await move.save();
        return byId(id);

    } catch (error) {
        console.error('Error finding action by primary key:', error);
        throw error;
    }
}

async function moveSelectQuery(where, order) {
    const query = `
        SELECT
            moves.id as MId,
            moves.name as MName,
            moves.created_at as MCreatedAt,
            moves.updated_at as MUpdatedAt,
            moves.is_hidden as MIsHidden,
            moves.description_ as MDescription,
            moves.seconds as MSeconds,
            moves_actions.loops as Loops,
            actions.id as AId,
            actions.name as AName,
            actions.created_at as ACreatedAt,
            actions.updated_at as AUpdatedAt,
            actions.is_hidden as AIsHidden,
            actions.description_ as ADescription,
            actions.seconds as ASeconds,
            actions.token as AToken
        FROM
            moves
        LEFT OUTER JOIN
            moves_actions ON moves.id = moves_actions.move_id
        LEFT OUTER JOIN
            actions ON moves_actions.action_id = actions.id
        WHERE
            ${whereMapper(where)}
        ORDER BY
            ${!order ? `moves.created_at DESC` : order};
    `;
    
    const [results] = await db.query(query, { raw: true });
    return results;
}


function whereMapper(whereCondition){
    return Object.entries(whereCondition)
        .map(([key, value]) => {
            if (typeof value == 'string' && value.includes('LIKE')) {
                return `${key} ${value}`
            } else {
                return `${key} = ${value}`
            }
        })
        .reduce(((acc, str, i) => {
            if ( i == 0 ) {
                return str
            } else {
            acc += ` AND ${str}`
            return acc
            }
        }),'')
}

function moveMapper(input) {
    const moves = Array.isArray(input) ? input : [input];
    const moveMap = moves.reduce((acc, move) => {
        const moveId = move.MId;
        
        acc.moveIds.add(moveId);
        if (!acc.moves[moveId]) {
            acc.moves[moveId] = {
                id: move.MId,
                name: move.MName,
                isHidden: move.MIsHidden == 1 ? true : false,
                description: move.MDescription,
                createdAt: move.MCreatedAt,
                updatedAt: move.MUpdatedAt,
                seconds: move.MSeconds
            };
        }
        
        if (!acc.actions[moveId]) {
            acc.actions[moveId] = [];
        }
        
        acc.actions[moveId].push({
            action: {
                id: move.AId,
                name: move.AName,
                isHidden: move.AIsHidden,
                description: move.ADescription,
                createdAt: move.ACreatedAt,
                updatedAt: move.AUpdatedAt,
                seconds: move.ASeconds,
                token: move.AToken
            },
            loops: Number(move.Loops)
        });
        
        return acc;
    }, {
        moves: {},
        actions: {},
        moveIds: new Set()
    });
    
    const mappedMoves = Array.from(moveMap.moveIds).map((moveId) => {
        
        return {
            ...moveMap.moves[moveId],
            actions: moveMap.actions[moveId]
        };
    });
    return mappedMoves;
}

exports.search = search;
exports.byId = byId;
exports.byName = byName;
exports.create = create;
exports.patch = patch;
exports.hide = hide;
