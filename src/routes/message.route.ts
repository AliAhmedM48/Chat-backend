import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { validateId } from '../middlewares/validateId.middleware';


class MessageRoutes {
    router = Router();
    controller = new MessageController();
    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.route('/')
            .post(this.controller.create)
            .get(this.controller.findAll)
            .delete(this.controller.delete);

        this.router.route('/:id')
            .all(validateId)
            .get(this.controller.findOne)
            .put(this.controller.update);
    }
}

export default new MessageRoutes().router;