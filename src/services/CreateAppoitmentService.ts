import { startOfHour } from 'date-fns';

import Appoitment from '../models/Appoitment';
import AppoitmentsRepository from '../repositories/AppoitmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppoitmentService {
  private appoitmentsRepository: AppoitmentsRepository;

  constructor(appoitmentsRepository: AppoitmentsRepository) {
    this.appoitmentsRepository = appoitmentsRepository;
  }

  public execute({ date, provider }: Request): Appoitment {
    const appoitmentDate = startOfHour(date);

    const findAppoitmentInSameDate = this.appoitmentsRepository.findByDate(
      appoitmentDate
    );

    if (findAppoitmentInSameDate) {
      throw Error('This appoitment is already booked');
    }

    const appoitment = this.appoitmentsRepository.create({
      provider,
      date: appoitmentDate,
    });

    return appoitment;
  }
}

export default CreateAppoitmentService;
