import { redirect } from '@sveltejs/kit';

export function load({ url }) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  redirect(301, `/auth_callback/${code}/${state}`);
}
