import express from 'express';
import xml2js from 'xml2js';
import fs from 'fs';
import path from 'path';
import covid19ImpactEstimator from '../estimator';

const router = express.Router();

router.post('/', (req, res) => {
  const convid = covid19ImpactEstimator(req.body);
  res.status(200).send(convid);
});

router.post('/json', (req, res) => {
  const convid = covid19ImpactEstimator(req.body);
  res.status(200).send(convid);
});

router.post('/xml', (req, res) => {
  const convid = covid19ImpactEstimator(req.body);
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(convid);
  res.type('application/xml');
  res.status(200).send(xml);
});

router.post('/logs', (req, res) => {
  res.set('content-type', 'text/plain');
  fs.readFile(path.join(process.cwd(), '/src/requests.log'), (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).send(data);
  });
});

export default router;
