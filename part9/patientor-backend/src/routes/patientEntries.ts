import express, { Request } from 'express';
import patientEntryService from '../services/patientEntryService';
import { toNewEntry } from '../utils';

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  (req: Request<{ id: string }, unknown, Record<string, unknown>>, res) => {
    try {
      const entry = patientEntryService.add(
        req.params.id,
        toNewEntry(req.body)
      );

      if (entry) res.json(entry);
      else res.status(404).send();
    } catch (error: unknown) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Unknown error.',
      });
    }
  }
);

export default router;
