import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import {resolve} from 'path';
import { SurveysRepository } from '../repositories/SurveysRepositoriy';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepositoriy';
import SendMailServices from '../services/SendMailServices';

class SendMailController {
    async exculte(request: Request,response: Response){
        const {email,survey_id} =request.body;
        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveyUsersRepository = getCustomRepository(SurveyUserRepository);

        const usesAlreadyExists = await userRepository.findOne({email});
        if(!usesAlreadyExists){
            return response.status(400).json({
                error:"User not exists"
            })
        }

        const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id});

        if(!surveyAlreadyExists){
            return response.status(400).json({
                error:"Survey not exists"
            }) 
        }
        const variables = {
            name:usesAlreadyExists.name,
            title:surveyAlreadyExists.title,
            description:surveyAlreadyExists.description,
            user_id:usesAlreadyExists.id,
            link:process.env.URL_MAil
        }
        const npspath =resolve(__dirname,"..","views","emails","npsMail.hbs");
        const surveyUsersAlreadyExists =await surveyUsersRepository.findOne({
            where:[{user_id:usesAlreadyExists.id},{value:null}],
            relations:["user","survey"]
        });
        if(surveyUsersAlreadyExists){
            await SendMailServices.exculte(email,surveyAlreadyExists.title,variables,npspath)
            return response.json(surveyUsersAlreadyExists);
        }

        const surveyUser = surveyUsersRepository.create({
            user_id:usesAlreadyExists.id,
            survey_id
        })
        await surveyUsersRepository.save(surveyUser);
        await SendMailServices.exculte(email,surveyAlreadyExists.title,variables,npspath)
        return response.json(surveyUser);

    }
}

export {SendMailController}