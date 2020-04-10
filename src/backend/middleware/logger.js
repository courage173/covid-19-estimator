import fs from 'fs';
import path from 'path';

const logger = (req, res, next) => {
  const time = new Date().getTime();
  const reqPath = req.originalUrl;
  res.on('finish', () => {
    const t = new Date().getTime();
    const timeDiff = t - time;
    const data = `\n${time}\t\t${reqPath}\t\t${res.statusCode}\t\t${timeDiff} ms`;
    fs.appendFile(path.join(process.cwd(), '/src/requests.log'), data, (error) => {
      if (error) {
        throw error;
      }
    });
  });

  next();
};

export default logger;
