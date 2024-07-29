<script lang="ts">
  type Top_Songs = { items: [{ name: string; artists: [{ name: string }]; external_urls: { spotify: string } }] };
  type Top_Artists = { items: [{ name: string; external_urls: { spotify: string } }] };
  type Data = {
    top_songs_four_years: Top_Songs;
    top_songs_six_months: Top_Songs;
    top_songs_four_weeks: Top_Songs;
    top_artists_four_years: Top_Artists;
    top_artists_six_months: Top_Artists;
    top_artists_four_weeks: Top_Artists;
  };

  export let data: Data;
  enum time_ranges {
    four_year,
    six_months,
    four_weeks,
  }
  let top_song_time_range = time_ranges.four_year;
  export let chosen_top_songs = data.top_songs_four_years;
  export let chosen_top_artists = data.top_artists_four_years;
</script>

<div class="flex">
  <div class="flex-col-left gap-1 timerange-buttons">
    <button
      class={top_song_time_range == time_ranges.four_year ? '' : 'unselected'}
      on:click={function () {
        top_song_time_range = time_ranges.four_year;
        chosen_top_songs = data.top_songs_four_years;
        chosen_top_artists = data.top_artists_four_years;
      }}
    >
      1 Year
    </button>
    <button
      class={top_song_time_range == time_ranges.six_months ? '' : 'unselected'}
      on:click={function () {
        top_song_time_range = time_ranges.six_months;
        chosen_top_songs = data.top_songs_six_months;
        chosen_top_artists = data.top_artists_six_months;
      }}
    >
      6 Months
    </button>
    <button
      class={top_song_time_range == time_ranges.four_weeks ? '' : 'unselected'}
      on:click={function () {
        top_song_time_range = time_ranges.four_weeks;
        chosen_top_songs = data.top_songs_four_weeks;
        chosen_top_artists = data.top_artists_four_weeks;
      }}
    >
      4 Weeks
    </button>
  </div>
  <div class="flex-col-left">
    <h1 class="title">Top songs</h1>
    <div></div>
    {#await chosen_top_songs}
      <p>Data loading</p>
    {:then top_songs}
      <ul>
        {#each top_songs.items as song, i}
          <a href={song.external_urls.spotify} target="_blank">
            <li class="scroll-overflow">
              <span>
                {i + 1}. {song.name} - {#each song.artists as artist, _}
                  {artist.name},
                {/each}
              </span>
            </li>
          </a>
        {/each}
      </ul>
    {/await}
  </div>
  <div class="flex-col-left">
    <h1 class="title">Top Artist</h1>
    {#await chosen_top_artists}
      <p>Data loading</p>
    {:then top_artists}
      <ul>
        {#each top_artists.items as artist, i}
          <a href={artist.external_urls.spotify} target="_blank">
            <li class="scroll-overflow">
              <span>
                {i + 1}.{artist.name}
              </span>
            </li>
          </a>
        {/each}
      </ul>
    {/await}
  </div>
</div>

<style>
  .timerange-buttons {
    padding-top: 7rem;
  }
  .scroll-overflow {
    width: 400px;
    height: 30px;
    overflow: hidden;
    line-height: 30px;
    position: relative;
  }
  .scroll-overflow span {
    position: absolute;
    white-space: nowrap;
    transform: translateX(0);
    transition: 2s;
  }
  .scroll-overflow:hover span {
    transform: translateX(calc(400px - max(calc(100%), 400px)));
  }
</style>
