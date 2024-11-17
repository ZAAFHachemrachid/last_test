<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import { quizStore } from '$lib/stores/quizStore';
    import type { QuizQuestion } from '$lib/types/quiz';

    let quizzes: QuizQuestion[][] = [];
    quizStore.subscribe(value => {
        quizzes = value;
    });

    const features = [
        {
            title: "Interactive Learning",
            description: "Interact with questions and get instant results",
            icon: "📚"
        },
        {
            title: "Progress Tracking",
            description: "Monitor your results and view answer details",
            icon: "📊"
        },
        {
            title: "Add Questions",
            description: "Contribute to expanding the question database",
            icon: "✏️"
        },
        {
            title: "Review and Learn",
            description: "View correct answers and explanations",
            icon: "🎯"
        }
    ];
</script>

<Navbar />

<main class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-8" >
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-5xl font-bold text-indigo-600 mb-6">Welcome to Fitness Quiz</h1>
            <p class="text-xl text-gray-600 mb-8">Test your knowledge in fitness and exercise!</p>
            
            <!-- Quick Stats -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-12">
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center">
                        <span class="block text-3xl font-bold text-indigo-600">{quizzes.length}</span>
                        <span class="text-gray-600">Available Quizzes</span>
                    </div>
                    <div class="text-center">
                        <span class="block text-3xl font-bold text-indigo-600">
                            {quizzes.reduce((total, quiz) => total + quiz.length, 0)}
                        </span>
                        <span class="text-gray-600">Total Questions</span>
                    </div>
                </div>
            </div>

            <!-- Call to Action Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <a href="/quiz" 
                   class="group bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Start Quiz</h2>
                    <p class="text-gray-600 mb-4">Choose from a variety of quizzes and test your knowledge</p>
                    <span class="inline-block text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                        Start Now →
                    </span>
                </a>
                
                <a href="/quiz_create" 
                   class="group bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Manage Quizzes</h2>
                    <p class="text-gray-600 mb-4">Create and edit your own quizzes</p>
                    <span class="inline-block text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
                        Start Creating →
                    </span>
                </a>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                {#each features as feature}
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <div class="text-4xl mb-4">{feature.icon}</div>
                        <h3 class="text-xl font-semibold text-indigo-600 mb-2">{feature.title}</h3>
                        <p class="text-gray-600">{feature.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>

<style>
    /* Add smooth transitions */
    .transition-all {
        transition: all 0.3s ease;
    }
</style>
