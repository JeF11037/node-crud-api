import server from './server';
import * as dotenv from 'dotenv';
dotenv.config();

const server_port = process.env.server_port || 5000;

server.listen(server_port, () => {
    console.log(`Server started on url - localhost:${server_port}/`);
});