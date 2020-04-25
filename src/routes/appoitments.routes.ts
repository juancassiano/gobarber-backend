import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppoitmentsRepository from '../repositories/AppoitmentsRepository';
import CreateAppoitmentService from '../services/CreateAppoitmentService';

const appoitmentsRepository = new AppoitmentsRepository();

const appoitmentsRouter = Router();

appoitmentsRouter.get('/', (request, response) => {
  const appoitments = appoitmentsRepository.all();

  return response.json(appoitments);
});

appoitmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppoitment = new CreateAppoitmentService(appoitmentsRepository);

    const appoitment = createAppoitment.execute({ provider, date: parsedDate });

    return response.json(appoitment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appoitmentsRouter;
