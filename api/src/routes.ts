import {Router} from 'express'
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();
const usersController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/users",usersController.create)
router.get("/surveys",surveysController.show)
router.post("/surveys",surveysController.create)

router.post("/SendMail",sendMailController.exculte)
router.get("/answers/:value",answerController.exculte)
router.get("/nps/:survey_id",npsController.exculte)
export {router};