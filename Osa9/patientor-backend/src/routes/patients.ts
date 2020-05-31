import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.create(newPatient);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;