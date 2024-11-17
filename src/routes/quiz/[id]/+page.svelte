<script lang="ts">
    import { page } from '$app/stores';
    import { quizStore } from '$lib/stores/quizStore';
    import type { QuizQuestion } from '$lib/types/quiz';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Navbar from '$lib/components/Navbar.svelte';

    let currentQuestion: number = 0;
    let userAnswers: (number | null)[] = [];
    let showResults: boolean = false;
    let questions: QuizQuestion[] = [];
    let quizId: number;
    let userName: string = '';
    let isFinishModalOpen = false;

    onMount(() => {
        userName = localStorage.getItem('quizUserName') || '';
        if (!userName) {
            goto('/quiz');
            return;
        }

        quizId = parseInt($page.params.id);
        quizStore.subscribe((value) => {
            if (value[quizId]) {
                questions = value[quizId].map((question, index) => ({ ...question, id: index }));
                if (!userAnswers.length) {
                    userAnswers = new Array(questions.length).fill(null);
                }
            } else {
                goto('/quiz');
            }
        });
    });

    function selectAnswer(optionIndex: number): void {
        if (!showResults) {
            userAnswers[currentQuestion] = optionIndex;
        }
    }

    function nextQuestion(): void {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
        } else if (!showResults && userAnswers.some(answer => answer !== null)) {
            isFinishModalOpen = true;
        }
    }

    function previousQuestion(): void {
        if (currentQuestion > 0) {
            currentQuestion--;
        }
    }

    function finishQuiz(): void {
        showResults = true;
        isFinishModalOpen = false;
    }

    function cancelFinish(): void {
        isFinishModalOpen = false;
    }

    function getScore(): number {
        return userAnswers.reduce((score, answer, index) => {
            return score + (answer === questions[index].correct ? 1 : 0);
        }, 0);
    }

    function getOptionClass(index: number): string {
        if (!showResults && userAnswers[currentQuestion] === index) {
            return 'bg-indigo-100 border-indigo-300';
        } else if (showResults) {
            if (index === questions[currentQuestion].correct) {
                return 'bg-green-100 border-green-300';
            } else if (userAnswers[currentQuestion] === index) {
                return 'bg-red-100 border-red-300';
            }
        }
        return 'border-gray-200 hover:bg-indigo-50 hover:border-indigo-300';
    }

    function restartQuiz(): void {
        userAnswers = new Array(questions.length).fill(null);
        currentQuestion = 0;
        showResults = false;
    }
</script>

<Navbar />

<div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            {#if questions.length > 0}
                {#if !showResults}
                    <!-- Quiz Progress -->
                    <div class="mb-8">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
                            <span class="text-sm font-medium text-indigo-600">Quiz taker: {userName}</span>
                            <span class="text-sm text-gray-600">
                                Answered: {userAnswers.filter(a => a !== null).length} of {questions.length}
                            </span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                class="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                                style="width: {(currentQuestion + 1) / questions.length * 100}%"
                            ></div>
                        </div>
                    </div>

                    <!-- Question -->
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-4">{questions[currentQuestion].question}</h2>
                        <div class="grid gap-4">
                            {#each questions[currentQuestion].options as option, index}
                                <button
                                    class="p-4 text-left rounded-lg border-2 transition-all duration-300 {getOptionClass(index)}"
                                    on:click={() => selectAnswer(index)}
                                >
                                    {option}
                                </button>
                            {/each}
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div class="flex justify-between mt-8">
                        <button
                            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            on:click={previousQuestion}
                            disabled={currentQuestion === 0}
                        >
                            Previous
                        </button>
                        <button
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            on:click={nextQuestion}
                        >
                            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
                        </button>
                    </div>
                {:else}
                    <!-- Results -->
                    <div class="text-center">
                        <h2 class="text-3xl font-bold text-indigo-600 mb-4">Quiz Results</h2>
                        <p class="text-xl mb-2">Great job, {userName}!</p>
                        <p class="text-lg mb-6">You scored {getScore()} out of {questions.length}</p>
                        
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
                                        stroke-dasharray={`${2 * Math.PI * 44 * getScore() / questions.length} ${2 * Math.PI * 44}`}
                                    />
                                </svg>
                                <div class="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span class="text-3xl font-bold text-gray-700">{Math.round(getScore() / questions.length * 100)}%</span>
                                </div>
                            </div>
                        </div>

                        <!-- Review Answers -->
                        <div class="text-left mt-8">
                            <h3 class="text-xl font-semibold mb-4">Review Your Answers</h3>
                            {#each questions as question, index}
                                <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <div class="flex justify-between items-start">
                                        <p class="font-semibold mb-2">{index + 1}. {question.question}</p>
                                        <span class={userAnswers[index] === question.correct ? 'text-green-600' : 'text-red-600'}>
                                            {userAnswers[index] === question.correct ? '✓' : '✗'}
                                        </span>
                                    </div>
                                    <div class="grid gap-2 mt-2">
                                        {#each question.options as option, optIndex}
                                            <div class={`p-3 rounded-lg ${
                                                optIndex === question.correct
                                                    ? 'bg-green-100 text-green-800'
                                                    : optIndex === userAnswers[index]
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-50'
                                            }`}>
                                                {option}
                                                {#if optIndex === question.correct}
                                                    <span class="ml-2 text-green-600">(Correct Answer)</span>
                                                {/if}
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/each}
                        </div>

                        <div class="mt-8 flex justify-center gap-4">
                            <button
                                class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                on:click={restartQuiz}
                            >
                                Try Again
                            </button>
                            <a
                                href="/quiz"
                                class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Back to Quizzes
                            </a>
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
    </div>
</div>

<!-- Finish Quiz Confirmation Modal -->
{#if isFinishModalOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 class="text-2xl font-bold text-indigo-600 mb-4">Finish Quiz?</h2>
            <p class="text-gray-600 mb-2">You have answered {userAnswers.filter(a => a !== null).length} out of {questions.length} questions.</p>
            <p class="text-gray-600 mb-6">Are you sure you want to finish the quiz? You can't change your answers after finishing.</p>
            <div class="flex justify-end gap-4">
                <button
                    class="px-4 py-2 text-gray-600 hover:text-gray-800"
                    on:click={cancelFinish}
                >
                    Continue Quiz
                </button>
                <button
                    class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    on:click={finishQuiz}
                >
                    Finish Quiz
                </button>
            </div>
        </div>
    </div>
{/if}
