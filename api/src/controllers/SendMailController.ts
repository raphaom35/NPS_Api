import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import {resolve} from 'path';
import { SurveysRepository } from '../repositories/SurveysRepositoriy';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepositoriy';
import SendMailServices from '../services/SendMailServices';
import { AppError } from '../errors/AppError';

class SendMailController {
    async exculte(request: Request,response: Response){
        const {email,survey_id} =request.body;
        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveyUsersRepository = getCustomRepository(SurveyUserRepository);

        const usesAlreadyExists = await userRepository.findOne({email});
        if(!usesAlreadyExists){
            throw new AppError("User not exists");
        }

        const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id});

        if(!surveyAlreadyExists){
            throw new AppError("Survey not exists");
        }

        const npspath =resolve(__dirname,"..","views","emails","npsMail.hbs");
        const surveyUserAlreadyExists = await surveyUsersRepository.findOne({
            where: { user_id: usesAlreadyExists.id, value: null, survey_id: survey_id },
            relations: ["user", "survey"],
          });
        const variables = {
            name:usesAlreadyExists.name,
            title:surveyAlreadyExists.title,
            description:surveyAlreadyExists.description,
            id:"",
            link:process.env.URL_MAil
        }
        if(surveyUserAlreadyExists){
            variables.id=surveyUserAlreadyExists.id;
            await SendMailServices.exculte(email,surveyAlreadyExists.title,variables,npspath)
            return response.json(surveyUserAlreadyExists);
        }

        const surveyUser = surveyUsersRepository.create({
            user_id:usesAlreadyExists.id,
            survey_id
        })

        await surveyUsersRepository.save(surveyUser);
        variables.id=surveyUser.id;
        await SendMailServices.exculte(email,surveyAlreadyExists.title,variables,npspath)
        return response.json(surveyUser);

    }
}

export {SendMailController}