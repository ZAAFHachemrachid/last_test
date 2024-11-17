<script lang="ts">
    import { page } from '$app/stores';
    import { quizStore } from '$lib/stores/quizStore';
    import { authStore } from '$lib/stores/authStore';
    import type { User } from '$lib/stores/authStore';
    import type { QuizQuestion } from '$lib/types/quiz';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Navbar from '$lib/components/Navbar.svelte';

    let quizId: string;
    let questions: QuizQuestion[] = [];
    let quizzes: QuizQuestion[][] = [];
    let user: User | null = null;
    let newQuestion: QuizQuestion = {
        question: '',
        options: ['', '', '', ''],
        correct: 0
    };
    let errorMessage: string = '';
    let successMessage: string = '';

    onMount(() => {
        const unsubscribe = authStore.subscribe((value: User | null) => {
            user = value;
            if (!value) {
                goto('/login');
            }
        });

        quizId = $page.params.id;
        quizStore.subscribe((value: QuizQuestion[][]) => {
            quizzes = value;
            if (quizId !== 'new') {
                const index = parseInt(quizId);
                if (value[index]) {
                    questions = [...value[index]];
                } else {
                    goto('/quiz_create');
                }
            }
        });

        return unsubscribe;
    });

    function validateQuestion(): boolean {
        if (!newQuestion.question.trim()) {
            errorMessage = 'Please enter a question';
            return false;
        }
        if (newQuestion.options.some(opt => !opt.trim())) {
            errorMessage = 'Please fill in all options';
            return false;
        }
        errorMessage = '';
        return true;
    }

    function addQuestion() {
        if (validateQuestion()) {
            questions = [...questions, { ...newQuestion }];
            newQuestion = {
                question: '',
                options: ['', '', '', ''],
                correct: 0
            };
            successMessage = 'Question added successfully';
            setTimeout(() => successMessage = '', 3000);
        }
    }

    function removeQuestion(index: number) {
        questions = questions.filter((_, i) => i !== index);
    }

    function saveQuiz() {
        if (questions.length === 0) {
            errorMessage = 'Please add at least one question';
            return;
        }

        if (quizId === 'new') {
            quizzes = [...quizzes, questions];
        } else {
            const index = parseInt(quizId);
            quizzes[index] = questions;
        }
        quizStore.set(quizzes);
        goto('/quiz_create');
    }
</script>

<Navbar />

{#if user}
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-3xl font-bold text-indigo-600 mb-8">
                    {quizId === 'new' ? 'Create New Quiz' : 'Edit Quiz'}
                </h1>

                {#if errorMessage}
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                        <span class="block sm:inline">{errorMessage}</span>
                    </div>
                {/if}

                {#if successMessage}
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                        <span class="block sm:inline">{successMessage}</span>
                    </div>
                {/if}

                <!-- Existing Questions -->
                <div class="mb-12">
                    <h2 class="text-xl font-semibold mb-4">Current Questions ({questions.length})</h2>
                    {#if questions.length === 0}
                        <div class="bg-gray-50 rounded-lg p-6 text-center">
                            <p class="text-gray-600">No questions added yet. Start by adding a new question below.</p>
                        </div>
                    {:else}
                        {#each questions as question, index}
                            <div class="bg-white rounded-lg shadow-lg p-6 mb-4">
                                <div class="flex justify-between items-start mb-4">
                                    <h3 class="text-lg font-medium">Question {index + 1}</h3>
                                    <button
                                        class="text-red-600 hover:text-red-700"
                                        on:click={() => removeQuestion(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <p class="mb-4">{question.question}</p>
                                <div class="grid gap-2">
                                    {#each question.options as option, optIndex}
                                        <div class="flex items-center">
                                            <span class={optIndex === question.correct ? 'text-green-600 font-semibold' : ''}>
                                                {option}
                                                {#if optIndex === question.correct}
                                                    <span class="ml-2 text-sm">(Correct Answer)</span>
                                                {/if}
                                            </span>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>

                <!-- Add New Question -->
                <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 class="text-xl font-semibold mb-4">Add New Question</h2>
                    <div class="mb-4">
                        <label for="question" class="block text-gray-700 mb-2">Question</label>
                        <input
                            id="question"
                            type="text"
                            bind:value={newQuestion.question}
                            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your question"
                        />
                    </div>
                    <div class="mb-4">
                        <span class="block text-gray-700 mb-2">Options</span>
                        {#each newQuestion.options as _, index}
                            <div class="flex items-center mb-2">
                                <input
                                    type="text"
                                    bind:value={newQuestion.options[index]}
                                    class="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter option {index + 1}"
                                />
                                <input
                                    type="radio"
                                    bind:group={newQuestion.correct}
                                    value={index}
                                    class="ml-4"
                                    id="option{index}"
                                />
                                <label for="option{index}" class="ml-2">Correct Answer</label>
                            </div>
                        {/each}
                    </div>
                    <div class="flex gap-4">
                        <button
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            on:click={addQuestion}
                        >
                            Add Question
                        </button>
                    </div>
                </div>

                <!-- Save Quiz -->
                <div class="flex justify-end gap-4">
                    <a
                        href="/quiz_create"
                        class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </a>
                    <button
                        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        on:click={saveQuiz}
                    >
                        Save Quiz
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
