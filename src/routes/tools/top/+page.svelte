<script lang="ts">
  type TOP_SONGS = {
    top_songs: { items: [{ name: string; artists: [{ name: string }] }] };
    top_artists: { items: [{ name: string }] };
  };
  export let data: TOP_SONGS;
</script>

<div class="flex">
  <div>
    <h1>Top songs</h1>
    {#await data.top_songs}
      <p>Loading</p>
    {:then top_songs}
      <ul>
        {#each top_songs.items as song, i}
          <li>
            {i + 1}.{song.name} - {#each song.artists as artist, o}
              {artist.name},
            {/each}
          </li>
        {/each}
      </ul>
    {/await}
  </div>
  <div>
    <h1>Top Artist</h1>
    {#await data.top_artists}
      <p>Loading</p>
    {:then top_artists}
      <ul>
        {#each top_artists.items as artist, i}
          <li>
            {i + 1}.{artist.name}
          </li>
        {/each}
      </ul>
    {/await}
  </div>
</div>
