import * as JSONBig from 'json-bigint';
import { Response, Request } from 'express';
import { AppError } from './ErrorHandler';

export default class globalSuccessHandler{
    sendJsonResponse(res: Response, message: string | null, metadata: any | null, data: any | null){
        const response: any = {
            code: 200,
            status: 'OK',
            message,
        };
        if (metadata) {
            response.metadata = metadata;
        }
        response.data = data;
        return res.status(200).contentType('application/json;charset=utf-8').send(JSONBig.stringify(response));
    }

    sendErrorResponse(req: Request, res: Response, err: Error) {
        if (err instanceof AppError) {
            return res.status(err.getCode()).json(err.toJSON());
        }

        return res.status(500).json({
            code: 500,
            status: 'Internal Server Error',
            message: err.message,
        });
    }
}