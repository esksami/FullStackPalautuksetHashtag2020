import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';


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

export default {
  getAll,
  getOne,
  create
};