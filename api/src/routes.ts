import {Router} from 'express'
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();
const usersController = new UserController();
const surveysController = new SurveysController();

router.post("/users",usersController.create)
router.get("/surveys",surveysController.show)
router.post("/surveys",surveysController.create)

export {router};