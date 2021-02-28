import {Request,Response} from 'express'
import { getCustomRepository,Not,IsNull } from 'typeorm'
import { SurveyUserRepository } from '../repositories/SurveyUserRepository'

class NpsController {

    async exculte(request: Request,response: Response){
        const {survey_id}=request.params;
        const surveysUserRepositoriy = getCustomRepository(SurveyUserRepository);

       const surveyUsers= await surveysUserRepositoriy.find({
            survey_id,
            value:Not(IsNull())

        })

        const detractor =surveyUsers.filter(
           (survey) =>(survey.value>=0 && survey.value<=6)
        ).length;
        const promoters =surveyUsers.filter(
            (survey) =>(survey.value>=9 && survey.value<=10)
         ).length;
         const passive =surveyUsers.filter(
            (survey) =>(survey.value>=7 && survey.value<=8)
         ).length;

         const totalAnswer = surveyUsers.length;

         const calculete =Number((((promoters-detractor)/totalAnswer)*100).toFixed(2));

         return response.json({
            detractor,
            promoters,
            passive,
            totalAnswer,
            nps:calculete
         })
    }
}

export {NpsController}