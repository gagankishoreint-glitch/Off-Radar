import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
    isLoggedIn: boolean;
    username: string | null;
    email: string | null;
    isGuest: boolean;

    // Saved items
    savedCompanies: string[]; // company IDs
    wishlist: string[]; // company IDs for wishlist
    readLater: string[]; // document IDs for comparisons

    // Actions
    login: (username: string, email: string, isGuest?: boolean) => void;
    logout: () => void;

    // Saved companies
    toggleSavedCompany: (companyId: string) => void;
    isSaved: (companyId: string) => boolean;

    // Wishlist
    toggleWishlist: (companyId: string) => void;
    isInWishlist: (companyId: string) => boolean;

    // Read later
    toggleReadLater: (documentId: string) => void;
    isReadLater: (documentId: string) => boolean;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            username: null,
            email: null,
            isGuest: false,
            savedCompanies: [],
            wishlist: [],
            readLater: [],

            login: (username, email, isGuest = false) => {
                set({ isLoggedIn: true, username, email, isGuest });

                // If switching from guest to regular user or vice versa, 
                // migrate storage
                if (isGuest && typeof window !== 'undefined') {
                    // Clear localStorage for guest
                    localStorage.removeItem('user-storage');
                }
            },

            logout: () => {
                const wasGuest = get().isGuest;
                set({
                    isLoggedIn: false,
                    username: null,
                    email: null,
                    isGuest: false,
                    savedCompanies: [],
                    wishlist: [],
                    readLater: []
                });

                // Clear appropriate storage
                if (typeof window !== 'undefined') {
                    if (wasGuest) {
                        sessionStorage.removeItem('user-storage');
                    } else {
                        localStorage.removeItem('user-storage');
                    }
                }
            },

            toggleSavedCompany: (companyId) => set((state) => ({
                savedCompanies: state.savedCompanies.includes(companyId)
                    ? state.savedCompanies.filter(id => id !== companyId)
                    : [...state.savedCompanies, companyId]
            })),

            isSaved: (companyId) => get().savedCompanies.includes(companyId),

            toggleWishlist: (companyId) => set((state) => ({
                wishlist: state.wishlist.includes(companyId)
                    ? state.wishlist.filter(id => id !== companyId)
                    : [...state.wishlist, companyId]
            })),

            isInWishlist: (companyId) => get().wishlist.includes(companyId),

            toggleReadLater: (documentId) => set((state) => ({
                readLater: state.readLater.includes(documentId)
                    ? state.readLater.filter(id => id !== documentId)
                    : [...state.readLater, documentId]
            })),

            isReadLater: (documentId) => get().readLater.includes(documentId)
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => {
                if (typeof window === 'undefined') return sessionStorage;

                // Check if current user is a guest by reading from both storages
                const sessionData = sessionStorage.getItem('user-storage');
                const localData = localStorage.getItem('user-storage');

                let isGuest = false;
                if (sessionData) {
                    try {
                        const parsed = JSON.parse(sessionData);
                        isGuest = parsed.state?.isGuest ?? false;
                    } catch (e) { }
                }
                if (!isGuest && localData) {
                    try {
                        const parsed = JSON.parse(localData);
                        isGuest = parsed.state?.isGuest ?? false;
                    } catch (e) { }
                }

                // Use sessionStorage for guests, localStorage for regular users
                return isGuest ? sessionStorage : localStorage;
            })
        }
    )
);
