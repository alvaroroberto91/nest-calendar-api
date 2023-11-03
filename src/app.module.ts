import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { Calendar } from './calendar.entity';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { ValidateTime } from './middlewares/validate.time';

@Module({
  imports: [TypeOrmModule.forFeature([Calendar]), TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateTime).forRoutes('event/create-event', 'event/update-event/:id');
  }
}
