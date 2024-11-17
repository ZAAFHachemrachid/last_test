import { writable } from 'svelte/store';

interface User {
    email: string;
    isAuthenticated: boolean;
}

const initialUser: User = {
    email: '',
    isAuthenticated: false
};

export const userStore = writable<User>(initialUser);
