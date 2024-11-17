<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import { addQuestion } from '$lib/stores/quizStore';
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
            errorMessage = "الرجاء إدخال السؤال";
            return;
        }

        // Validate options
        if (newQuestion.options.some(option => !option.trim())) {
            errorMessage = "الرجاء ملء جميع الخيارات";
            return;
        }

        // Add question
        addQuestion({
            question: newQuestion.question,
            options: [...newQuestion.options],
            correct: newQuestion.correct
        });

        // Reset form
        newQuestion = {
            question: "",
            options: ["", ""],
            correct: 0
        };

        successMessage = "تمت إضافة السؤال بنجاح!";
        errorMessage = "";

        // Clear success message after 3 seconds
        setTimeout(() => {
            successMessage = "";
        }, 3000);
    }
</script>

<Navbar />

<div class="container mx-auto px-4 py-8" dir="rtl">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-3xl font-bold text-indigo-600 mb-6 text-right">إضافة سؤال جديد</h1>

        {#if successMessage}
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-right">
                {successMessage}
            </div>
        {/if}

        {#if errorMessage}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-right">
                {errorMessage}
            </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <!-- Question Input -->
            <div>
                <label for="question" class="block text-sm font-medium text-gray-700 mb-2 text-right">
                    السؤال
                </label>
                <input
                    type="text"
                    id="question"
                    bind:value={newQuestion.question}
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-right"
                    placeholder="أدخل سؤالك هنا"
                    dir="rtl"
                />
            </div>

            <!-- Options -->
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <label class="block text-sm font-medium text-gray-700 text-right">الخيارات ({newQuestion.options.length})</label>
                    <div class="space-x-2">
                        <button 
                            type="button"
                            on:click={removeOption}
                            class="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors {newQuestion.options.length <= 2 ? 'opacity-50 cursor-not-allowed' : ''}"
                            disabled={newQuestion.options.length <= 2}
                        >
                            حذف خيار
                        </button>
                        <button 
                            type="button"
                            on:click={addOption}
                            class="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors {newQuestion.options.length >= 6 ? 'opacity-50 cursor-not-allowed' : ''}"
                            disabled={newQuestion.options.length >= 6}
                        >
                            إضافة خيار
                        </button>
                    </div>
                </div>
                {#each newQuestion.options as _, i}
                    <div class="flex items-center space-x-4">
                        <input
                            type="radio"
                            name="correct"
                            value={i}
                            bind:group={newQuestion.correct}
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <input
                            type="text"
                            bind:value={newQuestion.options[i]}
                            class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-right"
                            placeholder="أدخل الخيار {i + 1}"
                            dir="rtl"
                        />
                    </div>
                {/each}
                <p class="text-sm text-gray-500 text-right">اختر الإجابة الصحيحة عن طريق تحديد الدائرة بجانب الخيار</p>
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    إضافة السؤال
                </button>
                <button
                    type="button"
                    on:click={() => goto('/quiz')}
                    class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    أخذ الاختبار
                </button>
            </div>
        </form>
    </div>
</div>
