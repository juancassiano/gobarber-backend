import { isEqual } from 'date-fns';
import Appoitment from '../models/Appoitment';

interface CreateAppoitmentDTO {
  provider: string;
  date: Date;
}

class AppoitmentsRepository {
  private appoitments: Appoitment[];

  constructor() {
    this.appoitments = [];
  }

  public all(): Appoitment[] {
    return this.appoitments;
  }

  public findByDate(date: Date): Appoitment | null {
    const findAppoitment = this.appoitments.find(appoitment =>
      isEqual(date, appoitment.date)
    );

    return findAppoitment || null;
  }

  public create({ provider, date }: CreateAppoitmentDTO): Appoitment {
    const appoitment = new Appoitment({ provider, date });

    this.appoitments.push(appoitment);

    return appoitment;
  }
}

export default AppoitmentsRepository;
