import { Answer } from './answer.model'; // Assurez-vous que le modèle Answer est également défini.

export class Question {
  idQuestion: number;
  descripition: string;
  domain: string;
  userId: string;
  date: Date;

  constructor(
    idQuestion?: number,
    description?: string,
    domain?: string,
    userId?: string,
    date?: Date,
  ) {
    this.idQuestion = idQuestion || 0;
    this.descripition = description || '';
    this.domain = domain || '';
    this.userId = userId || '';
    this.date = date || new Date();
  }
}
