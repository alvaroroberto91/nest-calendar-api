import { Injectable, NestMiddleware, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response, NextFunction} from 'express';

@Injectable()
export class ValidateTime implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const startTime = req.body.start_event_hour;
        const endTime = req.body.end_event_hour;
    
        if (startTime >= endTime) {
          throw new HttpException('Start time must be before end time!', HttpStatus.BAD_REQUEST);
        }
    
        next();
    }
}