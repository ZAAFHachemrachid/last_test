import { writable } from 'svelte/store';

export interface User {
    id: string;
    username: string;
    email: string;
}

function createAuthStore() {
    const { subscribe, set, update } = writable<User | null>(null);

    return {
        subscribe,
        login: (user: User) => set(user),
        logout: () => set(null),
    };
}

export const authStore = createAuthStore();
