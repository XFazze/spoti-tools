import { redirect } from '@sveltejs/kit';
import { CLIENT_ID } from '$env/static/private';
function handleClick() {
  console.log('handle clic');
  const scope = 'playlist-read-private playlist-modify-public user-top-read';
  const redirect_uri = 'https://localhost:5173/auth_callback';
  const state = makeid(16);
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });
  const spotify_url = 'https://accounts.spotify.com/authorize?';
  console.log(spotify_url);
  //redirect(302, spotify_url);
  return;
}
