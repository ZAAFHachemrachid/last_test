<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import { quizStore } from '$lib/stores/quizStore';
    import type { QuizQuestion, UserAnswers } from '$lib/types/quiz';

    let currentQuestion: number | null = 0;
    let userAnswers: UserAnswers = [];
    let questions: QuizQuestion[] = [];

    quizStore.subscribe((value: QuizQuestion[]) => {
        questions = value;
        if (userAnswers.length !== questions.length) {
            userAnswers = new Array(questions.length).fill(null);
        }
    });

    function selectAnswer(optionIndex: number): void {
        if (currentQuestion !== null) {
            userAnswers[currentQuestion] = optionIndex;
        }
    }

    function nextQuestion(): void {
        if (currentQuestion !== null) {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
            } else {
                currentQuestion = null; // This will show results
            }
        }
    }

    function previousQuestion(): void {
        if (currentQuestion !== null && currentQuestion > 0) {
            currentQuestion--;
        }
    }

    function restartQuiz(): void {
        currentQuestion = 0;
        userAnswers = new Array(questions.length).fill(null);
    }

    function getOptionClass(index: number): string {
        if (currentQuestion === null) return '';
        
        if (userAnswers[currentQuestion] === index) {
            return 'bg-indigo-100 border-indigo-300';
        } else {
            return 'border-gray-200 hover:bg-indigo-50 hover:border-indigo-300';
        }
    }

    $: score = userAnswers.reduce((acc, answer, index) => 
        answer === questions[index]?.correct ? acc + 1 : acc, 0);
</script>

<Navbar />

<div class="min-h-screen bg-gray-50 py-8" dir="rtl">
    <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            {#if currentQuestion !== null}
                <!-- Quiz Progress -->
                <div class="mb-8">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-gray-600">السؤال {currentQuestion + 1} من {questions.length}</span>
                        <span class="text-sm text-gray-600">النتيجة: {score} من {questions.length}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-indigo-600 h-2.5 rounded-full" style="width: {(currentQuestion + 1) / questions.length * 100}%"></div>
                    </div>
                </div>

                <!-- Question -->
                <div class="mb-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">{questions[currentQuestion].question}</h2>
                    <div class="grid gap-4">
                        {#each questions[currentQuestion].options as option, index}
                            <button
                                class="p-4 text-right rounded-lg border-2 transition-all duration-300 {getOptionClass(index)}"
                                on:click={() => selectAnswer(index)}
                                disabled={userAnswers[currentQuestion] !== null}
                            >
                                {option}
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Navigation -->
                <div class="flex justify-between mt-8">
                    <button
                        class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors {currentQuestion === 0 ? 'invisible' : ''}"
                        on:click={previousQuestion}
                        disabled={currentQuestion === 0}
                    >
                        السابق
                    </button>
                    <button
                        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        on:click={nextQuestion}
                        disabled={userAnswers[currentQuestion] === null}
                    >
                        {currentQuestion === questions.length - 1 ? 'إنهاء الاختبار' : 'التالي'}
                    </button>
                </div>
            {:else}
                <!-- Results -->
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-indigo-600 mb-4">نتائج الاختبار</h2>
                    <p class="text-xl mb-6">لقد حصلت على {score} من {questions.length}</p>
                    
                    <div class="mb-8">
                        <div class="w-48 h-48 mx-auto relative">
                            <svg class="transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    class="text-gray-200"
                                    stroke-width="8"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="44"
                                    cx="50"
                                    cy="50"
                                />
                                <circle
                                    class="text-indigo-600"
                                    stroke-width="8"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="44"
                                    cx="50"
                                    cy="50"
                                    stroke-dasharray={`${2 * Math.PI * 44 * score / questions.length} ${2 * Math.PI * 44}`}
                                />
                            </svg>
                            <div class="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span class="text-3xl font-bold text-gray-700">{Math.round(score / questions.length * 100)}%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Review Answers -->
                    <div class="text-right">
                        <h3 class="text-xl font-semibold mb-4">مراجعة الإجابات</h3>
                        {#each questions as question, index}
                            <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                                <p class="font-semibold mb-2">{index + 1}. {question.question}</p>
                                <p class="text-green-600 mb-1">الإجابة الصحيحة: {question.options[question.correct]}</p>
                                {#if userAnswers[index] !== null}
                                    <p class="{userAnswers[index] === question.correct ? 'text-green-600' : 'text-red-600'}">
                                        إجابتك: {question.options[userAnswers[index]]}
                                    </p>
                                {:else}
                                    <p class="text-gray-500">لم تجب</p>
                                {/if}
                            </div>
                        {/each}
                    </div>

                    <div class="mt-8">
                        <button
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            on:click={restartQuiz}
                        >
                            إعادة الاختبار
                        </button>
                        <a
                            href="/"
                            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors ms-4"
                        >
                            العودة للرئيسية
                        </a>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
