<script lang="ts">
    import { quizStore } from '$lib/stores/quizStore';
    import type { QuizQuestion } from '$lib/types/quiz';
    import { goto } from '$app/navigation';
    import Navbar from '$lib/components/Navbar.svelte';

    let quizzes: QuizQuestion[][] = [];
    let showNameInput = false;
    let userName = '';
    let selectedQuizIndex: number | null = null;

    quizStore.subscribe((value) => {
        quizzes = value;
    });

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
{/if}
