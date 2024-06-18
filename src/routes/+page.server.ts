import { makeid } from '$lib/lib';
export function load({ cookies }) {
  const state = makeid(16);
  cookies.set('state', state, { path: '/' });
  return { state: state };
}
