import 'reflect-metadata'
import express,{NextFunction,Response,Request} from 'express';
import 'express-async-error';
import createConnection from "./database";
import { router } from './routes';
import { AppError } from './errors/AppError';
import { ValidationError } from 'yup'
interface ValidationErrors { 
    [key: string]: string[]
  }
createConnection();
const app = express();

app.use(express.json());
app.use(router);
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      })    
    }
  
    if (err instanceof ValidationError) {
      const validationErros: ValidationErrors = {}
      err.inner.forEach(error => {
        validationErros[error.path] = error.errors
      })
      return response.status(422).json({
        message: "Foram encontrados erros durante a validação dos parâmetros",
        validationErros
      })
    }
  
    return response.status(500).json({
      status: 'Error',
      message: `Internal server error ${err.message}`
    })
  })
export {app}