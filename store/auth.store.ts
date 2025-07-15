import { getCurrentUser } from '@/lib/AppWrite';
import { User } from '@/type';
import { create } from 'zustand';

// Zustand store for managing authentication state
type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    // Actions to update the state
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
}

// Zustand store implementation
const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    // Action implementations
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setLoading: (value) => set({ isLoading: value }),

    // Fetch the authenticated user from Appwrite
    fetchAuthenticatedUser: async () => {
        set({ isLoading: true });
        // Fetch the current user from Appwrite
        try {
            const user = await getCurrentUser();

            if (user) {
                set({ isAuthenticated: true, user: user as User });
            } else {
                set({ isAuthenticated: false, user: null });
            }
        } catch (e) {
            console.log('fetchAuthenticatedUser error:', e);
            set({ isAuthenticated: false, user: null });
        } finally {
            set({ isLoading: false })
        }
    },
}))

export default useAuthStore;