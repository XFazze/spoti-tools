<script lang="ts">
  let modes = ["Union", "Intersection", "CSV"];
  let mode = "Union";

  type Data = {
    playlists: [Playlist];
  };
  export let data: Data;
  let first_selected_playlist = { name: "", id: "" };
  let second_selected_playlist = { name: "", id: "" };
  let genre = "";
</script>

<div class="flex-col">
  <h1>Playlist Creator</h1>
  <div class="gap-1">
    {#each modes as m}
      <button on:click={() => (mode = m)} class={mode == m ? "" : "unselected"}>{m}</button>
    {/each}
  </div>
  <div>
    {#if mode === "Union" || mode === "Intersection"}
      <!--{data.playlists.items[0].id}-->
      <form method="post" action="?/two_playlists">
        {#if mode === "Union"}
          <input name="result_type" type="hidden" value="union" />
        {/if}
        {#if mode === "Intersection"}
          <input name="result_type" type="hidden" value="intersection" />
        {/if}
        <select name="first_playlist" bind:value={first_selected_playlist}>
          {#each data.playlists as playlist}
            <!--{#if playlist.id !== second_selected_playlist.id}-->
            <option
              value="&lbrace; 'href':'{playlist.tracks.href}','total':{playlist.tracks
                .total},'name':'{playlist.name}'&rbrace;"
            >
              {playlist.name}
            </option>
            <!--{/if}-->
          {/each}
        </select>
        <select name="second_playlist" bind:value={second_selected_playlist}>
          {#each data.playlists as playlist}
            <option
              value="&lbrace; 'href':'{playlist.tracks.href}','total':{playlist.tracks
                .total},'name':'{playlist.name}'&rbrace;"
            >
              {playlist.name}
            </option>
          {/each}
        </select>

        <button disabled={!first_selected_playlist && !second_selected_playlist} type="submit"> Submit </button>
      </form>
    {/if}
    {#if mode === "CSV"}
      <form method="post" enctype="multipart/form-data" action="?/csv">
        <input type="file" name="file" accept="text/csv" />
        <button type="submit"> Submit </button>
      </form>{/if}
  </div>
</div>

<style>
</style>
