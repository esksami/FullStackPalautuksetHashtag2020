import patients from '../../data/patients.json';
import { NonSensitivePatient } from '../types';


const getAll = (): Array<NonSensitivePatient> => {
  return patients.map(patient => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...nonSensitivePatient } = patient;

    return nonSensitivePatient;
  });
};

export default {
  getAll
};