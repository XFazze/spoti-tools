import { PUBLIC_SPOTIFY_URL } from '$env/static/public';
export async function load({ parent }) {
  const bearer_token = (await parent()).bearer_token;
  return {
    top_songs_four_years: await (
      await fetch(PUBLIC_SPOTIFY_URL + '/v1/me/top/tracks?limit=30&time_range=long_term', {
        headers: { Authorization: 'Bearer ' + bearer_token },
      })
    ).json(),
    top_songs_six_months: await (
      await fetch(PUBLIC_SPOTIFY_URL + '/v1/me/top/tracks?limit=30&time_range=medium_term', {
        headers: { Authorization: 'Bearer ' + bearer_token },
      })
    ).json(),
    top_songs_four_weeks: await (
      await fetch(PUBLIC_SPOTIFY_URL + '/v1/me/top/tracks?limit=30&time_range=short_term', {
        headers: { Authorization: 'Bearer ' + bearer_token },
      })
    ).json(),
    top_artists_four_years: await (
      await fetch(PUBLIC_SPOTIFY_URL + '/v1/me/top/artists?limit=30&time_range=long_term', {
        headers: { Authorization: 'Bearer ' + bearer_token },
      })
    ).json(),
    top_artists_six_months: await (
      await fetch(PUBLIC_SPOTIFY_URL + '/v1/me/top/artists?limit=30&time_range=medium_term', {
        headers: { Authorization: 'Bearer ' + bearer_token },
      })
    ).json(),
    top_artists_four_weeks: await (
      await fetch(PUBLIC_SPOTIFY_URL + '/v1/me/top/artists?limit=30&time_range=short_term', {
        headers: { Authorization: 'Bearer ' + bearer_token },
      })
    ).json(),
  };
}
