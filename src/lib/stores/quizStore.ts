import { writable, type Writable } from 'svelte/store';
import type { QuizQuestion } from '../types/quiz';

const initialQuizzes: QuizQuestion[][] = [
    // Quiz 1: Fitness Basics
    [
        {
            question: "What is the recommended daily water intake for adults?",
            options: ["2-3 liters", "1 liter", "4-5 liters", "0.5 liters"],
            correct: 0
        },
        {
            question: "Which exercise is considered a compound movement?",
            options: ["Bicep curls", "Squats", "Calf raises", "Wrist curls"],
            correct: 1
        },
        {
            question: "How many times per week should a beginner exercise?",
            options: ["1-2 times", "3-4 times", "Every day", "Twice per day"],
            correct: 1
        },
        {
            question: "What is the best time to exercise?",
            options: ["Morning", "Afternoon", "Evening", "Any time that suits your schedule"],
            correct: 3
        },
        {
            question: "Which is NOT a benefit of regular exercise?",
            options: ["Better sleep", "Increased energy", "Instant weight loss", "Improved mood"],
            correct: 2
        }
    ],
    // Quiz 2: Nutrition Basics
    [
        {
            question: "Which macronutrient is most important for muscle building?",
            options: ["Carbohydrates", "Fats", "Protein", "Fiber"],
            correct: 2
        },
        {
            question: "How many meals should you eat per day?",
            options: ["2 large meals", "3 main meals", "6 small meals", "It depends on your goals and schedule"],
            correct: 3
        },
        {
            question: "What is a calorie?",
            options: ["A type of vitamin", "A unit of energy", "A type of food", "A weight measurement"],
            correct: 1
        },
        {
            question: "Which food is considered a lean protein source?",
            options: ["Avocado", "Chicken breast", "White bread", "Olive oil"],
            correct: 1
        },
        {
            question: "When is the best time to eat carbohydrates?",
            options: ["Never", "Only at breakfast", "Only after workout", "Throughout the day as needed"],
            correct: 3
        }
    ],
    // Quiz 3: Workout Safety
    [
        {
            question: "What should you do before starting a workout?",
            options: ["Eat a large meal", "Warm up", "Take supplements", "Maximum weight lifting"],
            correct: 1
        },
        {
            question: "How do you know if you're exercising too intensely?",
            options: ["Can't hold a conversation", "Feeling slight challenge", "Sweating", "Increased heart rate"],
            correct: 0
        },
        {
            question: "What is proper gym etiquette?",
            options: ["Wipe equipment after use", "Leave weights on machines", "Skip warm-up", "Talk loudly on phone"],
            correct: 0
        },
        {
            question: "When should you skip a workout?",
            options: ["If slightly tired", "If having acute pain", "If busy", "If not motivated"],
            correct: 1
        },
        {
            question: "What is the proper way to breathe during exercise?",
            options: ["Hold breath", "Breathe rapidly", "Rhythmic breathing", "No specific pattern needed"],
            correct: 2
        }
    ],
    // Quiz 4: Recovery and Rest
    [
        {
            question: "How much sleep should an active person get?",
            options: ["4-5 hours", "6-7 hours", "7-9 hours", "10+ hours"],
            correct: 2
        },
        {
            question: "What is the purpose of rest days?",
            options: ["Muscle recovery", "Being lazy", "Saving time", "Avoiding exercise"],
            correct: 0
        },
        {
            question: "What should you do on rest days?",
            options: ["Intense training", "Light stretching", "Heavy lifting", "Run a marathon"],
            correct: 1
        },
        {
            question: "How long should you rest between strength training sessions?",
            options: ["No rest needed", "24-48 hours", "1 week", "2 weeks"],
            correct: 1
        },
        {
            question: "What is a sign of overtraining?",
            options: ["Improved performance", "Better sleep", "Constant fatigue", "Increased motivation"],
            correct: 2
        }
    ]
];

// Define the store type
export const quizStore: Writable<QuizQuestion[][]> = writable(initialQuizzes);

// Helper functions with type annotations
export const addQuiz = (quiz: QuizQuestion[]): void => {
    quizStore.update((quizzes: QuizQuestion[][]) => [...quizzes, quiz]);
};

export const updateQuiz = (index: number, quiz: QuizQuestion[]): void => {
    quizStore.update((quizzes: QuizQuestion[][]) => {
        const newQuizzes = [...quizzes];
        newQuizzes[index] = quiz;
        return newQuizzes;
    });
};

export const deleteQuiz = (index: number): void => {
    quizStore.update((quizzes: QuizQuestion[][]) => 
        quizzes.filter((_, i: number) => i !== index)
    );
};
