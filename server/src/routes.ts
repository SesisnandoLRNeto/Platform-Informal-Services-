import express from 'express';

import WorksControllers from './controllers/WorksController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const worksControllers = new WorksControllers();
const connectionsControllers = new ConnectionsController();

routes.get('/works', worksControllers.index);
routes.post('/works', worksControllers.create);

routes.get('/connections', connectionsControllers.index);
routes.post('/connections', connectionsControllers.create);

export default routes;
