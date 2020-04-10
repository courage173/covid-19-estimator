import express from 'express';
import xml2js from 'xml2js';
import fs from 'fs';
import path from 'path';
import covid19ImpactEstimator from '../estimator';
import logger from './middleware/logger';


const router = express.Router();

router.post('/', logger, (req, res) => {
  const convid = covid19ImpactEstimator(req.body);
  res.status(200).send(convid);
});

router.post('/json', logger, (req, res) => {
  const convid = covid19ImpactEstimator(req.body);
  res.status(200).send(convid);
});

router.post('/xml', logger, (req, res) => {
  const convid = covid19ImpactEstimator(req.body);
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(convid);
  res.type('application/xml');
  res.status(200).send(xml);
});

router.post('/logs', (req, res) => {
  fs.readFile(path.join(process.cwd(), '/src/requests.log'), (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).send(data.toLocaleString());
  });
});

export default router;
