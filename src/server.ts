import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { createConnection } from 'typeorm';
import app from './app';
import { db } from './configs/keys';

const port = process.env.PORT || 5000;

const connectionOption: ConnectionOptions = {
    type: 'postgres',
    name: 'flex',
    host: db.TYPEORM_HOST,
    port: db.TYPEORM_PORT,
    username: db.TYPEORM_USERNAME,
    password: String(db.TYPEORM_PASSWORD),
    database: db.TYPEORM_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        'src/entity/**/*.ts',
    ],
    migrations: [
        'migration/**/*.ts',
    ],
    subscribers: [
        'src/subscriber/**/*.ts',
    ],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'migration',
        subscribersDir: 'src/subscriber',
    },
}

const start = async () => {
    await createConnection(connectionOption)
    app.listen(port, () => {
        console.log(`The server is listening on port -> ${port}`);
    });
};

start().catch(console.error);