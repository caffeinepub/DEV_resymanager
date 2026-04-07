import { useActor } from "@caffeineai/core-infrastructure";
import { type Backend, createActor } from "../backend";

/**
 * Typed wrapper around useActor for the backend canister.
 * Returns a typed Backend instance and loading state.
 */
export function useBackend(): { actor: Backend | null; isFetching: boolean } {
  return useActor(createActor);
}
