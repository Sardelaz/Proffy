import express from 'express';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();

// Listar classes
routes.get('/classes', classesControllers.index);

// Criar classes
routes.post('/classes', classesControllers.create);
    
// Listar connections
routes.get('/connections', connectionsController.index)

// Criar connections
routes.post('/connections', connectionsController.create)

export default routes;