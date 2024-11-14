// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

/// <reference types="svelte-clerk/env" />

declare global {
	namespace App {
		interface Locals {
			session: import('clerk-sveltekit/server').Session | null;
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
