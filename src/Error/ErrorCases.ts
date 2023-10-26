import { AppError } from "./ErrorHandler";

export class AllError extends AppError{
    errors? : Record<string, unknown>;
    
    constructor(message : string , errorType: string, errors?: Record<string, unknown>){
        console.log("inside allerror");    

        switch(errorType){
            case 'Bad Request':
                super(400,'Bad Request',message);
                this.errors = errors;
                Error.captureStackTrace(this, this.constructor);
                break;
            
            case 'Forbidden':
                super(403,'forbidden',message);
                Error.captureStackTrace(this, this.constructor);
                break;
                            
            case 'Not Found':
                super(404,'Not Found',message);
                console.log("inside not found error");
                Error.captureStackTrace(this, this.constructor);
                break;

            case 'Not Implemented':
                super(501,'Not Implemented',message);
                Error.captureStackTrace(this, this.constructor);
                break;

            case 'Unauthorized':
                super(401,'Unauthorized',message);
                Error.captureStackTrace(this, this.constructor);
                break;
                
            default : 
                super(500,'Internal Server Error',message);
                Error.captureStackTrace(this, this.constructor);
        }
         //handle for Bad Request
         //handle for forbidden
         //handle for internal server error
         //handle for not found
         //handle for not implemented
         //handle for unauthorized 
    }
}