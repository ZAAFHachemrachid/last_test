<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import { quizStore } from '$lib/stores/quizStore';
    import { goto } from '$app/navigation';
    import type { QuizQuestion } from '$lib/types/quiz';

    let newQuestion: QuizQuestion = {
        question: "",
        options: ["", ""],
        correct: 0
    };

    let successMessage: string = "";
    let errorMessage: string = "";

    function addOption(): void {
        if (newQuestion.options.length < 6) {
            newQuestion.options = [...newQuestion.options, ""];
        }
    }

    function removeOption(): void {
        if (newQuestion.options.length > 2) {
            newQuestion.options = newQuestion.options.slice(0, -1);
            if (newQuestion.correct >= newQuestion.options.length) {
                newQuestion.correct = 0;
            }
        }
    }

    function handleSubmit(): void {
        // Validate question
        if (!newQuestion.question.trim()) {
            errorMessage = "Please enter a question";
            return;
        }

        // Validate options
        if (newQuestion.options.some(option => !option.trim())) {
            errorMessage = "Please fill in all options";
            return;
        }

        // Add question to a new quiz
        quizStore.addQuiz([{
            question: newQuestion.question,
            options: [...newQuestion.options],
            correct: newQuestion.correct
        }]);

        // Reset form
        newQuestion = {
            question: "",
            options: ["", ""],
            correct: 0
        };
        successMessage = "Question added successfully!";
        errorMessage = "";

        // Clear success message after 3 seconds
        setTimeout(() => {
            successMessage = "";
        }, 3000);
    }
</script>

<Navbar />

<div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-3xl font-bold text-indigo-600 mb-6">Add New Question</h1>

        {#if successMessage}
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {successMessage}
            </div>
        {/if}

        {#if errorMessage}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMessage}
            </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <!-- Question Input -->
            <div>
                <label for="question" class="block text-sm font-medium text-gray-700 mb-2">
                    Question
                </label>
                <input
                    type="text"
                    id="question"
                    bind:value={newQuestion.question}
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your question here"
                />
            </div>

            <!-- Options -->
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <div class="block text-sm font-medium text-gray-700">Options ({newQuestion.options.length})</div>
                    <div class="space-x-2">
                        <button 
                            type="button"
                            on:click={removeOption}
                            class="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors {newQuestion.options.length <= 2 ? 'opacity-50 cursor-not-allowed' : ''}"
                            disabled={newQuestion.options.length <= 2}
                        >
                            Remove Option
                        </button>
                        <button 
                            type="button"
                            on:click={addOption}
                            class="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors {newQuestion.options.length >= 6 ? 'opacity-50 cursor-not-allowed' : ''}"
                            disabled={newQuestion.options.length >= 6}
                        >
                            Add Option
                        </button>
                    </div>
                </div>
                {#each newQuestion.options as _, i}
                    <div class="flex items-center space-x-4">
                        <input
                            type="radio"
                            id="option{i}"
                            name="correct"
                            value={i}
                            bind:group={newQuestion.correct}
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label for="option{i}" class="flex-1">
                            <input
                                type="text"
                                bind:value={newQuestion.options[i]}
                                class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter option {i + 1}"
                            />
                        </label>
                    </div>
                {/each}
                <p class="text-sm text-gray-500">Select the correct answer by clicking the radio button next to the option</p>
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Add Question
                </button>
                <button
                    type="button"
                    on:click={() => goto('/quiz')}
                    class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Take Quiz
                </button>
            </div>
        </form>
    </div>
</div>
