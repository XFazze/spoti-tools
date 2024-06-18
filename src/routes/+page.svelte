<script>
  import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URL, PUBLIC_DEV_REDIRECT_URL } from '$env/static/public';
  const scope = 'playlist-read-private playlist-modify-public user-top-read';
  export let data;
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: PUBLIC_CLIENT_ID,
    scope: scope,
    redirect_uri: PUBLIC_REDIRECT_URL,
    state: data.state,
  });
  const spotify_url = 'https://accounts.spotify.com/authorize?' + params.toString();
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
      <button><a href={spotify_url}><h2>Authorize</h2></a></button>
      <!--<button on:click={() => handleClick()}><h2>Click here to authorize application</h2></button>-->
    </div>
  </div>
</section>
