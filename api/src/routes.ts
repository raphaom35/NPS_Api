import {Router} from 'express'
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();
const usersController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

router.post("/users",usersController.create)
router.get("/surveys",surveysController.show)
router.post("/surveys",surveysController.create)

router.post("/SendMail",sendMailController.exculte)

export {router};