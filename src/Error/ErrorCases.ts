import { AppError } from "./ErrorHandler";

export class AllError extends AppError{
    errors? : Record<string, unknown>;

    constructor(message : string , errorType: string, errors?: Record<string, unknown>){
        

        switch(errorType){
            case 'Bad Request':
                super(message,'Bad Request',400);
                break;
            
            case 'Forbidden':
                super(message,'forbidden',403);
                break;
                            
            case 'Not Found':
                super(message,'Not Found',404);
                break;

            case 'Not Implemented':
                super(message,'Not Implemented',501);
                break;

            case 'Unauthorized':
                super(message,'Unauthorized',401);
                break;
                
            default : 
                super(message,'Internal Server Error',500);
        }
         //handle for Bad Request
         //handle for forbidden
         //handle for internal server error
         //handle for not found
         //handle for not implemented
         //handle for unauthorized 
    }
}