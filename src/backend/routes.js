import express from 'express';
import convert from 'xml-js';
import fs from 'fs';
import path from 'path';
import covid19ImpactEstimator from '../estimator';
import logger from './middleware/logger';


const router = express.Router();

router.post('/', logger, (req, res) => {
  res.status(200).send('welcome to the estimator');
});

router.post('/json', logger, (req, res) => {
  const convid = covid19ImpactEstimator(req.body);
  res.status(200).send(convid);
});

router.post('/xml', logger, (req, res) => {
  const convid = covid19ImpactEstimator(req.body);
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  const result = convert.json2xml(convid, options);
  res.status(200).send(result);
});

router.post('/logs', (req, res) => {
  fs.readFile(path.join(process.cwd(), '/src/requests.log'), (err, data) => {
    if (err) {
      throw err;
    }
    return res.status(200).send(data);
  });
});

export default router;
