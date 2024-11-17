export interface QuizQuestion {
    question: string;
    options: string[];
    correct: number;
}

export type UserAnswers = (number | null)[];
