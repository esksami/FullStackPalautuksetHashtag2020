import { isArray } from 'util';
import express from 'express';
import bodyParser from 'body-parser';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';


const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(400).json({ error: 'malformatted parameters'});
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight)
  });
});

interface ExercisesParameters {
  target: number,
  daily_exercises: Array<number>
} 

app.post('/exercises', (req, res) => {
  if (!('daily_exercises' in req.body) || !('target' in req.body)) {
    res.status(400).json({ error: 'parameters missing'});
  }

  const params = (req.body as ExercisesParameters);

  if (!isArray(params.daily_exercises) ||
      params.daily_exercises.some( value => isNaN(Number(value)) )) {
    res.status(400).json({ error: 'malformatted parameters'});
  }

  if (isNaN(Number(params.target))) {
    res.status(400).json({ error: 'malformatted parameters'});
  }

  const daily_exercises = params.daily_exercises.map(value => Number(value));
  const target = Number(params.target);

  const result = calculateExercises(target, daily_exercises);

  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});