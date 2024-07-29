// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      bearer_token: string;
      bearer_token_expire: string;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  type Playlist = { name: string; id: string; tracks: { href: string; total: number } };
  type Artist = { genres: string[] };
  type Genre_Help = { genres: Set<string>; songs_by_genre: any };
}

export {};
