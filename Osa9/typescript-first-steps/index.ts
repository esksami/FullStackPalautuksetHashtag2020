import express from 'express';

import { calculator } from './calculator';
import type { Operation } from './calculator';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/calculate', (req, res) => {
  const value1 = Number(req.query.value1);
  const value2 = Number(req.query.value2);
  const op: Operation = String(req.query.op) as Operation;

  const result = calculator(value1, value2, op);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});