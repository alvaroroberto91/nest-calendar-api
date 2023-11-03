import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { Matches, IsDateString, IsNotEmpty } from 'class-validator';

@Entity()
export class Calendar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    event_title: string;

    @Column()
    @IsNotEmpty({message: "Event Date cannot be empty!"})
    @IsDateString()
    event_date: string;

    @Column()
    @IsNotEmpty({message: "Start hour cannot be empty!"})
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'Invalid Hour Format. Use the format: "HH:MM:SS".',
      })
    start_event_hour: string;
    
    @Column()
    @IsNotEmpty({message: "End hour cannot be empty!"})
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'Invalid Hour Format. Use the format: "HH:MM:SS".',
      })
    end_event_hour: string;
}