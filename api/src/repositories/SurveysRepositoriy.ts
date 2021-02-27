import { EntityRepository, Repository } from "typeorm";
import { Surveys } from "../models/Survey";

@EntityRepository(Surveys)
class SurveysRepository extends Repository<Surveys> {
}

export {SurveysRepository}