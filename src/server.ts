import 'reflect-metadata';
import 'dotenv';
import cors from 'cors';
import express, { NextFunction, Response, Request } from 'express';
import './database';
import './container';
import 'express-async-errors';
import AppError from './errors/AppError';

import routes from './infra/routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333');
});
