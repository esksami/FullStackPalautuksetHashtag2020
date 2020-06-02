/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, NewPatient, NewEntry, Diagnosis, HealthCheckRating } from './types';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error(`Incorrect or missing gender: ${gender}`);
  } 
  return gender;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
};


const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }

  return specialist;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }

  return description;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  console.log('codes', codes);
  if (!Array.isArray(codes))
    throw new Error(`Expected diagnosis codes to be an array. Got: ${codes}`);
  
  codes.forEach((code: any) => {
    if (!code || !isString(code)) {
      throw new Error(`Incorrect diagnosis code: ${code}`);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)) {
      throw new Error(`Incorrect or missing healthCheckRating: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
  if (!discharge)
    throw new Error(`Missing discharge field`);

  if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error(`Incorrect or missing discharge criteria: ${discharge.criteria}`);
  }

  if (!discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
      throw new Error(`Incorrect or missing discharge date: ${discharge.date}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return discharge;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employer name: ${employerName}`);
  }

  return employerName;
};

const parseSickLeave = (sickLeave: any): { startDate: string; endDate: string } => {
  if (!sickLeave)
    throw new Error(`Missing sickLeave field`);

  if (!sickLeave.startDate || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
    throw new Error(`Incorrect or missing sick leave start date: ${sickLeave.startDate}`);
  }

  if (!sickLeave.endDate || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
      throw new Error(`Incorrect or missing sick leave end date: ${sickLeave.endDate}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return sickLeave;
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = {
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    description: parseDescription(object.description),
    ...(object.diagnosisCodes && {
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes) 
    })
  };

  switch (object.type) {
    case "HealthCheck":
      return {
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        ...baseEntry
      };
    case "Hospital":
      return {
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
        ...baseEntry
      };
    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(object.employerName),
        ...(object.sickLeave && {
          sickLeave: parseSickLeave(object.sickLeave)
        }),
        ...baseEntry
      };
    default:
      throw new Error(
        `Unknown or missing entry type: ${object.type}`
      );
  }
};