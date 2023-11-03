import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus} from '@nestjs/common';
import { Calendar } from './calendar.entity';
import { CalendarService } from './calendar.service';

@Controller('event')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @Post('create-event')
    create(@Body() event: Calendar): Promise<Calendar> {
        return this.calendarService.create(event);
    }

    @Get('list-all')
    findAll(): Promise<Calendar[]> {
        return this.calendarService.findAll();
    }

    @Get('list-event/:id')
    findOne(@Param('id') id: number): Promise<Calendar> {
        return this.calendarService.findOne(id);
    }

    @Put('update-event/:id')
    update(@Param('id') id: number, @Body() event: Calendar): Promise<Calendar> {
        return this.calendarService.update(id, event);
    }

    @Delete('delete-event/:id')
    async delete(@Param('id') id: number): Promise<{message: string}> {
        await this.calendarService.delete(id);
        return {message: "Event deleted successfully!"} ;
    }
}
