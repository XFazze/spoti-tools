import { PUBLIC_SPOTIFY_URL } from '$env/static/public';
export async function load({ parent }) {
  const bearer_token = (await parent()).bearer_token;
  return {
    top_songs: await (
      await fetch(PUBLIC_SPOTIFY_URL + '/v1/me/top/tracks?limit=20', {
        headers: { Authorization: 'Bearer ' + bearer_token },
      })
    ).json(),
    top_artists: await (
      await fetch(PUBLIC_SPOTIFY_URL + '/v1/me/top/artists?limit=20', {
        headers: { Authorization: 'Bearer ' + bearer_token },
      })
    ).json(),
  };
}
