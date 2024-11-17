<script lang="ts">
    import { quizStore } from '$lib/stores/quizStore';
    import { authStore } from '$lib/stores/authStore';
    import type { User } from '$lib/stores/authStore';
    import type { QuizQuestion } from '$lib/types/quiz';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Navbar from '$lib/components/Navbar.svelte';

    let quizzes: QuizQuestion[][] = [];
    let user: User | null = null;

    onMount(() => {
        const unsubscribe = authStore.subscribe((value: User | null) => {
            user = value;
            if (!value) {
                goto('/login');
            }
        });

        quizStore.subscribe((value: QuizQuestion[][]) => {
            quizzes = value;
        });

        return unsubscribe;
    });

    function deleteQuiz(index: number) {
        quizzes = quizzes.filter((_, i) => i !== index);
        quizStore.set(quizzes);
    }
</script>

<Navbar />

{#if user}
    <div class="min-h-screen bg-gray-50 py-8" dir="auto">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold text-indigo-600">Manage Quizzes</h1>
                    <button
                        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                        on:click={() => goto('/quiz_create/new')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        Create New Quiz
                    </button>
                </div>

                {#if quizzes.length === 0}
                    <div class="bg-white rounded-lg shadow-lg p-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                        </svg>
                        <h2 class="text-xl font-semibold text-gray-700 mb-2">No Quizzes Created Yet</h2>
                        <p class="text-gray-600 mb-6">Get started by creating your first quiz!</p>
                        <button
                            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
                            on:click={() => goto('/quiz_create/new')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                            Create First Quiz
                        </button>
                    </div>
                {:else}
                    <div class="grid gap-6">
                        {#each quizzes as quiz, index}
                            <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h2 class="text-xl font-semibold mb-2">Quiz {index + 1}</h2>
                                        <p class="text-gray-600">{quiz.length} {quiz.length === 1 ? 'Question' : 'Questions'}</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <button
                                            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                            on:click={() => goto(`/quiz_create/${index}`)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                                            on:click={() => deleteQuiz(index)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
