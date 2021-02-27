import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepositoriy';

class SurveysController{
    async create(request: Request,response: Response){
        const {title,description} = request.body;

        const surveysRepositoriy = getCustomRepository(SurveysRepository);

        const surveys = surveysRepositoriy.create({
            title,
            description
        })
        await surveysRepositoriy.save(surveys);

        return response.status(201).json(surveys);
    }
    async show(request: Request,response: Response){
        const surveysRepositoriy = getCustomRepository(SurveysRepository);
        const all = await surveysRepositoriy.find();
        return response.status(200).json(all);
    }
}
export{SurveysController}