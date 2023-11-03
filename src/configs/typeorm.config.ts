import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    "type": "postgres",
    "host": "pgsql",
    "port": 5432,
    "username": "admin",
    "password": "kasekage",
    "database": "postgres",
    "synchronize": true,
    "entities": ["dist/**/*.entity{.ts,.js}"]
};