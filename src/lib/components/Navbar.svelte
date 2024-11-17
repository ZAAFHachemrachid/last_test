<script lang="ts">
    import { page } from '$app/stores';
    import { authStore } from '$lib/stores/authStore';
    import type { User } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';

    let isOpen = false;
    const toggleMenu = () => isOpen = !isOpen;

    let user: User | null = null;
    authStore.subscribe(value => {
        user = value;
    });

    function handleLogout() {
        authStore.logout();
        goto('/');
    }

    // Navigation items with descriptions
    const navItems = [
        {
            path: '/',
            label: 'Home',
            description: 'Home Page'
        },
        {
            path: '/quiz',
            label: 'Quiz',
            description: 'Start Quiz'
        },
        {
            path: '/quiz_create',
            label: 'Manage Quizzes',
            description: 'Create and Edit Quizzes'
        }
    ];
</script>

<nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
            <div class="flex">
                <div class="flex-shrink-0 flex items-center">
                    <a href="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-300">Fitness Quiz</a>
                </div>
                <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {#each navItems as item}
                        <a 
                            href={item.path} 
                            class="inline-flex items-center px-1 pt-1 text-gray-900 {$page.url.pathname === item.path ? 
                                'border-b-2 border-indigo-600 text-indigo-600' : 
                                'hover:text-indigo-500 hover:border-b-2 hover:border-indigo-500'} 
                                font-semibold transition-all duration-300"
                            title={item.description}
                        >
                            {item.label}
                        </a>
                    {/each}
                </div>
            </div>

            <div class="flex items-center">
                {#if user}
                    <button
                        on:click={handleLogout}
                        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Logout
                    </button>
                {:else}
                    <a
                        href="/login"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Login
                    </a>
                {/if}
                <!-- Mobile menu button -->
                <button 
                    class="md:hidden ml-4 outline-none mobile-menu-button focus:ring-2 focus:ring-indigo-500 rounded-lg p-1" 
                    on:click={toggleMenu}
                    aria-label="Toggle mobile menu"
                    aria-expanded={isOpen}
                >
                    <svg class="w-6 h-6 text-gray-500 hover:text-indigo-500 transition-colors duration-300"
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
        <div class="md:hidden mobile-menu bg-white border-t border-gray-100">
            <ul class="pt-4 pb-3">
                {#each navItems as item}
                    <li>
                        <a 
                            href={item.path} 
                            class="block text-sm px-4 py-3 text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300 {$page.url.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : ''}"
                            title={item.description}
                        >
                            {item.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</nav>
