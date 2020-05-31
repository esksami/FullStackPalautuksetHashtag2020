import express from 'express';

import diaryRouter from './routes/diaries';


const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/api/diaries', diaryRouter);

app.get('/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});