import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
  cookies.set('bearer_token', '', { path: '/' });
  redirect(301, '/');
}
