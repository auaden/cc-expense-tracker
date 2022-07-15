import { writable } from "svelte/store";
import type { Account } from "src/types";

export const accounts = writable<Account[]>([]);
