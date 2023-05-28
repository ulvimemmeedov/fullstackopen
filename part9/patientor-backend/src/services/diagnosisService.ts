import data from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const getAll = (): Diagnosis[] => {
  return data;
};

export default {
  getAll,
};
