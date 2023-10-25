export class AppError extends Error{
    
    statusCode : number;
    status : boolean | string;
    isOperational : boolean;

    constructor(message:string,status:string,statusCode:number){
        super(message);
        
        this.statusCode = statusCode;
        this.status = status;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    getCode(): number {
        return this.statusCode;
    }

    toJSON() {
        return {
            code: this.statusCode,
            status: this.status,
            message: this.message,
        };
    }
}