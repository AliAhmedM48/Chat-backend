import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';


class UserRoutes {
    router = Router();
    controller = new MessageController();
    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router
            .post('/messages', this.controller.create)
            .get('/messages', this.controller.findAll)
        this.router
            .get('/messages/:id', this.controller.findOne)
            .put('/messages/:id', this.controller.update)
            .delete('/messages/:id', this.controller.delete)
            .delete('/messages', this.controller.delete)
    }
}

export default new UserRoutes().router;