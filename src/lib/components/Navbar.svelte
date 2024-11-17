<script lang="ts">
    import { page } from '$app/stores';

    let isOpen = false;
    const toggleMenu = () => isOpen = !isOpen;

    // Navigation items with descriptions
    const navItems = [
        {
            path: '/',
            label: 'الرئيسية',
            description: 'الصفحة الرئيسية'
        },
        {
            path: '/quiz',
            label: 'الاختبار',
            description: 'ابدأ الاختبار'
        },
        {
            path: '/create',
            label: 'إضافة سؤال',
            description: 'أضف أسئلة جديدة'
        }
    ];
</script>

<nav class="bg-white shadow-lg" dir="rtl">
    <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
            <div class="flex space-x-7">
                <div>
                    <a href="/" class="flex items-center py-4 px-2">
                        <span class="font-bold text-indigo-600 text-lg">اختبار اللياقة</span>
                    </a>
                </div>
                
                <div class="hidden md:flex items-center space-x-1">
                    {#each navItems as item}
                        <div class="relative group">
                            <a 
                                href={item.path} 
                                class="py-4 px-2 {$page.url.pathname === item.path ? 
                                    'text-indigo-600 border-b-2 border-indigo-600' : 
                                    'text-gray-500 hover:text-indigo-500'} 
                                    font-semibold transition duration-300"
                                title={item.description}
                            >
                                {item.label}
                            </a>
                            <!-- Tooltip -->
                            <div class="absolute hidden group-hover:block w-48 px-2 py-1 bg-gray-700 text-white text-sm rounded-md -bottom-8 left-1/2 transform -translate-x-1/2">
                                {item.description}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button class="outline-none mobile-menu-button" on:click={toggleMenu}>
                    <svg class="w-6 h-6 text-gray-500 hover:text-indigo-500"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    {#if isOpen}
        <div class="md:hidden mobile-menu">
            <ul class="pt-4 pb-3">
                {#each navItems as item}
                    <li><a href={item.path} class="block text-sm px-2 py-4 hover:bg-indigo-500 hover:text-white transition duration-300">{item.label}</a></li>
                {/each}
            </ul>
        </div>
    {/if}
</nav>

<style>
    /* Add smooth transitions */
    a {
        transition: all 0.3s ease;
    }
    
    /* Tooltip animation */
    .group:hover .group-hover\:block {
        animation: fadeIn 0.2s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, 10px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
</style>
