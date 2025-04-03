import express from 'express';
import path from 'path';
import { config } from 'dotenv';
import Database from './utils/database';

config();
const app = express();

const database = new Database();
const connect = database.connection();
connect();

const staticRoute = (route: string) => path.resolve(__dirname, 'public', route);

app.use('/', express.static(staticRoute('./routes'), { extensions: ['html'] }));
app.use('/components', express.static(staticRoute('./components'), { extensions: ['html'] }));
app.use('/js', express.static(staticRoute('./js'), { extensions: ['js'] }));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});