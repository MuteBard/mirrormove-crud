const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { verifyToken, handleError } = require('./middleware')
const { APP } = require("./settings");
const action = require('./src/controllers/actionController')
const move = require('./src/controllers/moveController')
const { synchronize } = require('./src/repositories/client')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get(`/action/search`, verifyToken, action.search, handleError);
app.get(`/action/id/:id`, verifyToken, action.getById, handleError);
app.get(`/action/name/:name`, verifyToken, action.getByName, handleError);
app.post(`/action`, verifyToken, action.create, handleError);
app.patch(`/action`, verifyToken, action.patch, handleError);
app.delete(`/action/id/:id`, verifyToken, action.remove, handleError);

app.get(`/move/search`, verifyToken, move.search, handleError);
app.get(`/move/id/:id`, verifyToken, move.getById, handleError);
app.get(`/move/name/:name`, verifyToken, move.getByName, handleError);
app.get(`/move/batch`, verifyToken, move.batch, handleError);
app.post(`/move`, verifyToken, move.create, handleError);
app.patch(`/move`, verifyToken, move.patch, handleError);
app.delete(`/move/id/:id`, verifyToken, move.remove, handleError);

app.listen(APP.port, () => {
    console.log(`Server is running on ${APP.host}:${APP.port}`)
    synchronize();
});
