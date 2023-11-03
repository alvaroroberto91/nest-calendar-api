import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendar } from './calendar.entity';

@Injectable()
export class CalendarService {
    constructor(
        @InjectRepository(Calendar)
        private calendarRepository: Repository<Calendar>,
    ) {}

    async create(event: Calendar): Promise<Calendar> {
        return this.calendarRepository.save(event);
    }

    async findOne(id: number): Promise<Calendar> {
        const event = await this.calendarRepository.findOne({where: { id }});
        if (!event) {
            throw new NotFoundException('Event not found!');
        }
        return event;
    }
     
    async findAll(): Promise<Calendar[]> {
        return this.calendarRepository.find();
    }

    async update(id: number, event: Calendar): Promise<Calendar> {
        await this.calendarRepository.update(id, event);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.calendarRepository.delete(id);
    }
}