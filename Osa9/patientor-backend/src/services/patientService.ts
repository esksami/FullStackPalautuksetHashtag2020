import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient, NewEntry, Entry } from '../types';


const getAll = (): Array<NonSensitivePatient> => {
  return patients.map(patient => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...nonSensitivePatient } = patient;

    return nonSensitivePatient;
  });
};

const getOne = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const create = (newPatient: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuidv4();
  const patient = {
    id,
    ...newPatient
  };

  patients.push(patient);

  return patient;
};

const addEntry = (patientId: string, newEntry: NewEntry): Entry => {
  const patient = patients.find(patient => patient.id === patientId);

  if (!patient)
    throw new Error(`No patient found with id: ${patientId}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuidv4();
  const entry = {
    id,
    ...newEntry
  } as Entry;

  patient.entries = [...patient.entries, entry];

  return entry;
};

export default {
  getAll,
  getOne,
  create,
  addEntry
};