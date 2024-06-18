import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
  const expire_seconds = cookies.get('bearer_token_expire');
  if (new Date().getUTCSeconds() > Number(expire_seconds)) {
  }
  const bearer_token = cookies.get('bearer_token');
  if (bearer_token === undefined) {
    redirect(301, '/');
  }
  return { bearer_token: bearer_token };
}
