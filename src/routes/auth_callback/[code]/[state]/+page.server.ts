import { CLIENT_SECRET } from '$env/static/private';
import {
  PUBLIC_CLIENT_ID,
  PUBLIC_REDIRECT_URL,
  PUBLIC_SPOTIFY_TOKEN_URL,
  PUBLIC_SPOTIFY_URL,
} from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';
import { Buffer } from 'buffer';
import { URLSearchParams } from 'url';
export async function load({ cookies, params }) {
  cookies.set('code', params.code, { path: '/' });
  const correct_state = cookies.get('state');
  if (correct_state != params.state) {
    return error(500, 'State is not matching. Possible bad actor.');
  }
  const auth = 'Basic ' + Buffer.from(PUBLIC_CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
  var response = await fetch(
    PUBLIC_SPOTIFY_TOKEN_URL +
      '?' +
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: params.code,
        redirect_uri: PUBLIC_REDIRECT_URL,
      }).toString(),
    {
      method: 'POST',
      headers: {
        Authorization: auth,
        'content-type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const response_json = await response.json();
  cookies.set('bearer_token', response_json.access_token, { path: '/' });
  cookies.set('bearer_token_expire', (new Date().getUTCSeconds() + 3600).toString(), { path: '/' });

  redirect(301, '/tools');
}
