import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

class UserRoutes {
    router = Router();
    controller = new UserController();
    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router
            .get('/users', this.controller.findAll)
        this.router
            .get('/users/:id', this.controller.findOne)
            .put('/users/:id', this.controller.update)
            .delete('/users/:id', this.controller.delete)
        this.router
            .post('/auth/register', this.controller.create)
            .post('/auth/login', this.controller.login)
    }
}

export default new UserRoutes().router;