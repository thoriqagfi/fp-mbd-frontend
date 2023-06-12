import { create } from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import produce from "immer";
import { setToken, getToken, removeToken } from "@/lib/token";
import { User } from "@/types/user";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean
  stopLoading: () => void;
  login: (user: User) => void;
  logout: () => void;

}

const AuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (user) => {
    setToken('token', user.token);
    set(
      produce<AuthStore>((state) => {
        state.isAuthenticated = true;
        state.user = user;
      })
    );
  },
  logout: () => {
    removeToken();
    set(
      produce<AuthStore>((state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
    );
  },
  stopLoading: () => {
    set(
      produce<AuthStore>((state) => {
        state.isLoading = false
      })
    );
  }
}));

const useAuthStore = createSelectorHooks(AuthStore);
export default useAuthStore;

/* OLD
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import produce from 'immer';
import { create } from 'zustand';
import { setToken, removeToken } from '../lib/token';
import { User } from '@/types/user';

type AuthStoreType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  stopLoading: () => void;
};

const useAuthStoreBase = create<AuthStoreType>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (user) => {
    setToken(user.token);
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = true;
        state.user = user;
      })
    );
  },
  logout: () => {
    removeToken();
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
    );
  },
  stopLoading: () => {
    set(
      produce<AuthStoreType>((state) => {
        state.isLoading = false;
      })
    );
  },
}));
const useAuthStore = createSelectorHooks(useAuthStoreBase);
export default useAuthStore;*/
