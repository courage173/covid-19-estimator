import fs from 'fs';
import path from 'path';

const logger = (req, res, next) => {
  const time = new Date().getMilliseconds();
  const reqPath = req.originalUrl;
  res.on('finish', () => {
    const t = new Date().getMilliseconds();
    let timeDiff = t - time;
    if (timeDiff < 10) {
      timeDiff += 10;
    }
    const data = `\n${req.method}\t${reqPath}\t${res.statusCode}\t${timeDiff}ms`;
    fs.appendFile(path.join(process.cwd(), '/src/requests.log'), data, (error) => {
      if (error) {
        throw error;
      }
    });
  });

  next();
};

export default logger;
