import { Question } from './question.model';

export class Answer {
  idanswer: number;
  description: string;
  userId: string;
  approve: number;
  date: Date;
  questionId: number;

  constructor(
    idanswer?: number,
    description?: string,
    userId?: string,
    approve?: number,
    date?: Date,
    questionId?: number
  ) {
    this.idanswer = idanswer || 0;
    this.description = description || '';
    this.userId = userId || '';
    this.approve = approve || 0;
    this.date = date || new Date();
    this.questionId = questionId || 0;
  }
}
