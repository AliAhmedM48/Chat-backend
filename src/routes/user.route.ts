import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateId } from '../middlewares/validateId.middleware';

class UserRoutes {
    router = Router();
    controller = new UserController();
    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.route('/')
            .get(this.controller.findAll)
            // ! during development
            .post(this.controller.create);

        this.router.route('/:id')
            .all(validateId)
            .get(this.controller.findOne)
            .put(this.controller.update)
            .delete(this.controller.delete);

        this.router
            .post('/auth/register', this.controller.create)
            .post('/auth/login', this.controller.login);
    }
}

export default new UserRoutes().router;