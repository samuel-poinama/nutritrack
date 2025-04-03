import express, { Request, Response } from 'express';
import User from './models/user.model';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
import path from 'path';
import { config } from 'dotenv';
import Database from './utils/database';
import UserController from './controller/user.controller';
import UserDto from './dtos/user.dto';
import ObjectiveDto from './dtos/objective.dto';

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
app.use('/api/:route', async (req: Request, res: Response, next: Function): Promise<any> => {
    const route = req.params.route;
    if (route === 'register' || route === 'login') {
        return next();
    }

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    const user = await userController.getByToken(token);
    if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
});

app.post('/api/register', async (req: Request, res: Response): Promise<any> => {
    
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is required' });
    }

    if (!req.body.name || !req.body.password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }


    const { name, password } = req.body;

   const found = await userController.getByName(name);

   if (found) {
    return res.status(400).json({ error: 'User already exists' });
   }

    const user = await userController.create(name, password);
    return res.status(201).json(new UserDto(user));
});


app.post('/api/login', async (req: Request, res: Response): Promise<any> => {
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is required' });
    }

    if (!req.body.name || !req.body.password) {
        return res.status(400).json({ error: 'Name and password are required' });
    }

    const { name, password } = req.body;

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


app.post('/api/logout', async (req: Request, res: Response): Promise<any> => {
    const user = req.user;
    await userController.update(user!);
    return res.status(200).json({ message: 'Logged out successfully' });
});


app.get('/api/objective', async (req: Request, res: Response): Promise<any> => {
    const user = req.user;

    return res.status(200).json(user!.objective);
});


app.put('/api/objective', async (req: Request, res: Response): Promise<any> => {
    const user = req.user;

    if (!req.body) {
        return res.status(400).json({ error: 'Request body is required' });
    }

    const objective = req.body as ObjectiveDto;

    if (objective.calories) {
        user!.objective.calories = objective.calories;
    }

    if (objective.fat) {
        user!.objective.fat = objective.fat;
    }

    if (objective.protein) {
        user!.objective.protein = objective.protein;
    }

    await userController.update(user!);

    return res.status(200).json(user!.objective);

});




app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});