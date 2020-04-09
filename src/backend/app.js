import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();


app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/on-covid-19', router);


export default app;
