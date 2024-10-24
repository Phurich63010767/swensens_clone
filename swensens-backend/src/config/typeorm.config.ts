import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'yphurich5',
    database: 'swensens_db',
    autoLoadEntities: true,
    synchronize: true, // Not recommended for production
};
