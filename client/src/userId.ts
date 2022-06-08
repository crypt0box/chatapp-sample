import { useMemo } from "react";

const localStorageKey = "__chat-app-user-id";

export function useUserId(): string {
  return useMemo(() => {
    const fromStorage = window.localStorage.getItem(localStorageKey);
    if (fromStorage == null) {
      const generated = Math.random().toString(36).slice(-8);
      window.localStorage.setItem(localStorageKey, generated);
      return generated;
    } else {
      return fromStorage;
    }
  }, []);
}
