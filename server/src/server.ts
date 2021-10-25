/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

var corsOptions = {
  origin: 'http://localhost:3001',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);

app.listen(3000);
