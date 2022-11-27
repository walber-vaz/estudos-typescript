import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import { itemsRouter } from './items/items.router';
import { errorHandle } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
};

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/items', itemsRouter);

app.use(notFoundHandler);
app.use(errorHandle);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});