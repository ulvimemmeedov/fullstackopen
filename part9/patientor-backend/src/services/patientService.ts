import patients from '../../data/patients';

import { v4 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const add = (payload: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...payload,
  };

  patients.push(patient);

  return patient;
};

const getAll = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getNonSensitive = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  add,
  getAll,
  getNonSensitive,
  findById,
};
