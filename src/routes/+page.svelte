<script>
  import { redirect } from '@sveltejs/kit';
  import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URL, PUBLIC_DEV_REDIRECT_URL } from '$env/static/public';
  import { makeid } from '$lib/lib';
  import { dev } from '$app/environment';
  function handleClick() {
    console.log('handle clic');
    const scope = 'playlist-read-private playlist-modify-public user-top-read';
    const state = makeid(16);

    const redirect_url = dev ? PUBLIC_DEV_REDIRECT_URL : PUBLIC_REDIRECT_URL;
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: PUBLIC_CLIENT_ID,
      scope: scope,
      redirect_uri: PUBLIC_REDIRECT_URL,
      state: state,
    });
    const spotify_url = 'https://accounts.spotify.com/authorize?' + params.toString();
    console.log(spotify_url);
    return redirect(302, spotify_url);
  }
</script>

<svelte:head>
  <title>Authorize</title>
  <meta name="description" content="Spotify tools" />
</svelte:head>
<section>
  <div class="center w-max">
    <div>
      <h1>Spoti-tools</h1>
    </div>
    <div>
      <button on:click={() => handleClick()}><h2>Click here to authorize application</h2></button>
    </div>
  </div>
</section>
