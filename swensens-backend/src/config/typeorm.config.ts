import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'phurich5',
    database: 'swensens_clone',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // true สำหรับพัฒนา แต่ควรเป็น false ใน production
}
