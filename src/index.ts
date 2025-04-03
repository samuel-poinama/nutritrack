import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticRoute = (route: string) => path.resolve(__dirname, 'public', route);

app.use('/', express.static(staticRoute('./routes')));
app.use('/components', express.static(staticRoute('./components'), { extensions: ['html'] }));
app.use('/js', express.static(staticRoute('./js'), { extensions: ['js'] }));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});