import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
class AnswerController{

    async exculte(request: Request,response: Response){
        const {value} =request.params;
        const {u} = request.query;

        const surveysUserRepositoriy = getCustomRepository(SurveyUserRepository);
        const surveyUser =await surveysUserRepositoriy.findOne({
            id:String(u)
        });
        if(!surveyUser){
            throw new AppError("Survey User not found")
        }

        surveyUser.value = Number(value);

        await surveysUserRepositoriy.save(surveyUser);

        return response.json(surveyUser);
    }

}

export{AnswerController}