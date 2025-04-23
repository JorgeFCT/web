import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import businessRoutes from './app/routes/business';
import './app/db';

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;


app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '30mb' }));


app.use('/api/business', businessRoutes);


app.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`);
});

