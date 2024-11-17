<script lang="ts">
    import { quizStore } from '$lib/stores/quizStore';
    import type { QuizQuestion } from '$lib/types/quiz';
    import { goto } from '$app/navigation';
    import Navbar from '$lib/components/Navbar.svelte';

    // Quiz selection state
    let quizzes: QuizQuestion[][] = [];
    let showNameInput = false;
    let userName = '';
    let selectedQuizIndex: number | null = null;

    // Quiz taking state
    let currentQuestion: number | null = 0;
    let userAnswers: number[] = [];
    let questions: QuizQuestion[] = [];

    quizStore.subscribe((value) => {
        quizzes = value;
    });

    // Quiz selection functions
    function startQuiz(index: number) {
        if (!userName.trim()) {
            selectedQuizIndex = index;
            showNameInput = true;
        } else {
            goto(`/quiz/${index}`);
        }
    }

    function handleStartQuiz() {
        if (!userName.trim()) {
            alert('Please enter your name to start the quiz');
            return;
        }
        
        if (selectedQuizIndex !== null) {
            localStorage.setItem('quizUserName', userName);
            goto(`/quiz/${selectedQuizIndex}`);
        }
    }

    // Quiz taking functions
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

{#if showNameInput}
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Welcome to the Quiz!</h2>
                    <div class="mb-6">
                        <label for="userName" class="block text-sm font-medium text-gray-700 mb-2">
                            Please enter your name to start
                        </label>
                        <input
                            type="text"
                            id="userName"
                            bind:value={userName}
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div class="flex justify-end gap-4">
                        <button
                            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            on:click={() => {
                                showNameInput = false;
                                selectedQuizIndex = null;
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            on:click={handleStartQuiz}
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else if currentQuestion !== null}
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-lg shadow-lg p-8">
                    <div class="mb-8">
                        <h2 class="text-2xl font-semibold text-gray-800">Question {currentQuestion + 1} of {questions.length}</h2>
                        <p class="text-lg mt-4">{questions[currentQuestion].question}</p>
                    </div>

                    <div class="space-y-4 mb-8">
                        {#each questions[currentQuestion].options as option, index}
                            <button
                                class="w-full p-4 text-left border rounded-lg transition-colors {getOptionClass(index)}"
                                on:click={() => selectAnswer(index)}
                            >
                                {option}
                            </button>
                        {/each}
                    </div>

                    <div class="flex justify-between">
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
                            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold text-indigo-600">Available Quizzes</h1>
                </div>
                
                {#if quizzes.length === 0}
                    <div class="text-center py-8">
                        <p class="text-gray-600 text-lg">No quizzes available yet.</p>
                    </div>
                {:else}
                    <div class="grid gap-6">
                        {#each quizzes as quiz, index}
                            <div class="bg-white rounded-lg shadow-lg p-6">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h2 class="text-xl font-semibold mb-2">Quiz {index + 1}</h2>
                                        <p class="text-gray-600">{quiz.length} Questions</p>
                                    </div>
                                    <button
                                        on:click={() => startQuiz(index)}
                                        class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Start Quiz
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{:else}
    <!-- Results -->
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h2 class="text-3xl font-bold text-indigo-600 mb-4">Quiz Results</h2>
                    <p class="text-xl mb-6">You scored {score} out of {questions.length}</p>
                    <button
                        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        on:click={restartQuiz}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
