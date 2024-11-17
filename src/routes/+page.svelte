<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
    import { quizStore } from '$lib/stores/quizStore';
    import type { QuizQuestion } from '$lib/types/quiz';

    let questions: QuizQuestion[] = [];
    quizStore.subscribe(value => {
        questions = value;
    });

    const features = [
        {
            title: "تعلم تفاعلي",
            description: "تفاعل مع الأسئلة واحصل على نتائج فورية",
            icon: "📚"
        },
        {
            title: "تتبع التقدم",
            description: "راقب نتائجك وشاهد تفاصيل إجاباتك",
            icon: "📊"
        },
        {
            title: "أضف أسئلتك",
            description: "ساهم في توسيع قاعدة الأسئلة",
            icon: "✏️"
        },
        {
            title: "راجع وتعلم",
            description: "شاهد الإجابات الصحيحة والشروحات",
            icon: "🎯"
        }
    ];
</script>

<Navbar />

<main class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-8 text-right" dir="rtl">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-5xl font-bold text-indigo-600 mb-6">مرحباً بك في اختبار اللياقة</h1>
            <p class="text-xl text-gray-600 mb-8">اختبر معرفتك في مجال اللياقة البدنية والتمارين الرياضية!</p>
            
            <!-- Quick Stats -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-12">
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center">
                        <span class="block text-3xl font-bold text-indigo-600">{questions.length}</span>
                        <span class="text-gray-600">عدد الأسئلة المتاحة</span>
                    </div>
                    <div class="text-center">
                        <span class="block text-3xl font-bold text-indigo-600">اختيار متعدد</span>
                        <span class="text-gray-600">نوع الأسئلة</span>
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
        <h2 class="text-2xl font-semibold text-indigo-600 mb-4">ابدأ الاختبار</h2>
        <p class="text-gray-600 mb-4">ابدأ جلسة اختبار جديدة واختبر معرفتك في مجال اللياقة البدنية</p>
        <span class="inline-block text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
            ابدأ الآن ←
        </span>
    </a>
    
    <a href="/create" 
       class="group bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
        </div>
        <h2 class="text-2xl font-semibold text-indigo-600 mb-4">أضف سؤالاً</h2>
        <p class="text-gray-600 mb-4">ساهم في قاعدة الأسئلة بإضافة أسئلتك الخاصة</p>
        <span class="inline-block text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
            أضف الآن ←
        </span>
    </a>
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
