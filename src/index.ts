import express, { Request, Response } from 'express';
import path from 'path';
import { config } from 'dotenv';
import Database from './utils/database';
import UserController from './controller/user.controller';
import UserDto from './dtos/user.dto';

config();
const app = express();

const database = new Database();
const connect = database.connection();
connect();

const userController = new UserController(database.db!);

const staticRoute = (route: string) => path.resolve(__dirname, 'public', route);

app.use('/', express.static(staticRoute('./routes'), { extensions: ['html'] }));
app.use('/components', express.static(staticRoute('./components'), { extensions: ['html'] }));
app.use('/js', express.static(staticRoute('./js'), { extensions: ['js'] }));

app.use(express.json());

app.post('/api/register', async (req: Request, res: Response): Promise<any> => {
    
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }

   const found = await userController.getByName(name);

   if (found) {
    return res.status(400).json({ error: 'User already exists' });
   }

    const user = await userController.create(name, password);
    return res.status(201).json(new UserDto(user));
});


app.post('/api/login', async (req: Request, res: Response): Promise<any> => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }

    const user = await userController.getByName(name);

    if (!user) {
        return res.status(401).json({ error: 'Invalid name or password' });
    }

    if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid name or password' });
    }

    const token = Math.random().toString(36).substring(2, 15);
    user.token = token;

    await userController.update(user);
    return res.status(200).json({ token: user.token });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});