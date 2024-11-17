import { writable, type Writable } from 'svelte/store';
import type { QuizQuestion } from '$lib/types/quiz';

const initialQuestions: QuizQuestion[] = [
    {
        question: "ما هو أفضل تمرين لبناء عضلات البطن؟",
        options: [
            "تمارين الضغط",
            "تمارين المعدة (Crunches)",
            "تمارين البلانك",
            "رفع الساقين"
        ],
        correct: 2
    },
    {
        question: "كم مرة يُنصح بممارسة التمارين الرياضية أسبوعياً للمبتدئين؟",
        options: [
            "مرة واحدة",
            "3-2 مرات",
            "7-6 مرات",
            "كل يوم مرتين"
        ],
        correct: 1
    },
    {
        question: "ما هو أفضل وقت لشرب البروتين بعد التمرين؟",
        options: [
            "خلال 30 دقيقة",
            "بعد ساعتين",
            "قبل النوم",
            "في الصباح التالي"
        ],
        correct: 0
    },
    {
        question: "ما هي أفضل تمارين حرق الدهون؟",
        options: [
            "المشي السريع",
            "تمارين القوة",
            "الجري المتقطع (HIIT)",
            "تمارين اليوغا"
        ],
        correct: 2
    },
    {
        question: "كم من الوقت يجب أن تستمر جلسة الإحماء قبل التمرين؟",
        options: [
            "5-10 دقائق",
            "10-15 دقيقة",
            "20-30 دقيقة",
            "ساعة كاملة"
        ],
        correct: 1
    },
    {
        question: "ما هو أفضل تمرين لتقوية عضلات الظهر؟",
        options: [
            "الضغط",
            "السحب للأعلى (Pull-ups)",
            "تمارين البطن",
            "القرفصاء (Squats)"
        ],
        correct: 1
    },
    {
        question: "كم لتر من الماء يجب شربه يومياً أثناء ممارسة الرياضة؟",
        options: [
            "1-2 لتر",
            "2-3 لتر",
            "3-4 لتر",
            "أكثر من 4 لتر"
        ],
        correct: 2
    },
    {
        question: "ما هي أفضل وجبة قبل التمرين؟",
        options: [
            "بروتين فقط",
            "كربوهيدرات فقط",
            "مزيج من البروتين والكربوهيدرات",
            "الصيام"
        ],
        correct: 2
    }
];

export const quizStore: Writable<QuizQuestion[]> = writable(initialQuestions);

export const addQuestion = (question: QuizQuestion): void => {
    quizStore.update(questions => [...questions, question]);
};
