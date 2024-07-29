import { PUBLIC_SPOTIFY_URL } from "$env/static/public";
import { parseCSV } from "$lib/lib";
export async function load({ parent }) {
  const bearer_token = (await parent()).bearer_token;
  return {
    playlists: await get_playlists(bearer_token),

    //playlist_songs: await get_genres(bearer_token, playlists),
  };
}
export const actions = {
  two_playlists: async ({ request, locals }) => {
    const data = await request.formData();
    const result_type = data.get("result_type");
    const first_playlist_data = data.get("first_playlist");
    const second_playlist_data = data.get("second_playlist");
    if (!first_playlist_data || !second_playlist_data || !result_type) {
      throw "playlist links are unkown";
    }
    const first_playlist_json = JSON.parse((first_playlist_data as string).replace(/'/g, '"'));
    const second_playlist_json = JSON.parse((second_playlist_data as string).replace(/'/g, '"'));
    let combined_set = new Set<string>();
    let name = "";
    if (result_type === "union") {
      name = `Union of ${first_playlist_json.name} and ${second_playlist_json.name}`;
      await get_tracks_add_to_set(first_playlist_json, combined_set, locals.bearer_token);
      await get_tracks_add_to_set(second_playlist_json, combined_set, locals.bearer_token);
      console.log("union set", combined_set);
    } else if (result_type === "intersection") {
      const first_playlist = new Set<string>();
      name = `Intersection of ${first_playlist_json.name} and ${second_playlist_json.name}`;
      await get_tracks_add_to_set(first_playlist_json, first_playlist, locals.bearer_token);
      const second_playlist = new Set<string>();
      await get_tracks_add_to_set(second_playlist_json, second_playlist, locals.bearer_token);
      combined_set = new Set([...first_playlist].filter((i) => second_playlist.has(i)));
    }

    const user_json = await (
      await fetch(PUBLIC_SPOTIFY_URL + "/v1/me", {
        headers: { Authorization: "Bearer " + locals.bearer_token },
      })
    ).json();
    const create_playlist = await (
      await fetch(PUBLIC_SPOTIFY_URL + `/v1/users/${user_json.id}/playlists`, {
        headers: { Authorization: "Bearer " + locals.bearer_token, "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name: name,
          description: `Playlist generated by spoti-tools.fabianoden.com at ${new Date().toUTCString()}`,
          public: false,
        }),
      })
    ).json();
    const add_songs_to_playlist = await fetch(PUBLIC_SPOTIFY_URL + `/v1/playlists/${create_playlist.id}/tracks`, {
      headers: { Authorization: "Bearer " + locals.bearer_token, "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        uris: [...combined_set],
      }),
    });
  },
  csv: async ({ request, locals }) => {
    const data = await request.formData();
    const csv = (await data.get("file")) as File;
    const rows = parseCSV(await csv.text());
    let track_col = 0,
      artist_col = 1,
      album_col = 2,
      year_col = 3;
    let track_search = false,
      artist_search = false,
      album_search = false,
      year_search = false;
    rows.forEach((row) => {
      if (row[0] == "track" || row[1] == "track" || row[2] == "track" || row[3] == "track")
        row.forEach((row_element, i) => {
          if (row_element === "track") {
            track_col = i;
            track_search = true;
          } else if (row_element === "artist") {
            artist_col = i;
            artist_search = true;
          } else if (row_element === "album") {
            album_col = i;
            album_search = true;
          } else if (row_element === "year") {
            year_col = i;
            year_search = true;
          }
        });
      let q = "";
      let search_params = new URLSearchParams({
        type: "track",
        limit: "3",
        q: `track:"${tracks[1][0]}" artist:"${tracks[1][1]}" album:"${tracks[1][2]}" year:${tracks[1][3]}`,
      }).toString();
    });
    console.log(search_params);
    const search_result = await (
      await fetch(PUBLIC_SPOTIFY_URL + `/v1/search?` + search_params, {
        headers: { Authorization: "Bearer " + locals.bearer_token, "content-type": "application/json" },
      })
    ).json();
    console.log(search_result.tracks.items.length);
    search_result.tracks.items.forEach((element: any) => {
      console.log("track " + element.name + " " + element.artists[0].name);
    });
    console.log(search_result.tracks.items);
    //const user_json = await (
    //  await fetch(PUBLIC_SPOTIFY_URL + "/v1/me", {
    //    headers: { Authorization: "Bearer " + locals.bearer_token },
    //  })
    //).json();
    //const create_playlist = await (
    //  await fetch(PUBLIC_SPOTIFY_URL + `/v1/users/${user_json.id}/playlists`, {
    //    headers: { Authorization: "Bearer " + locals.bearer_token, "content-type": "application/json" },
    //    method: "POST",
    //    body: JSON.stringify({
    //      name: name,
    //      description: `Playlist generated by spoti-tools.fabianoden.com at ${new Date().toUTCString()}`,
    //      public: false,
    //    }),
    //  })
    //).json();
    //const add_songs_to_playlist = await fetch(PUBLIC_SPOTIFY_URL + `/v1/playlists/${create_playlist.id}/tracks`, {
    //  headers: { Authorization: "Bearer " + locals.bearer_token, "content-type": "application/json" },
    //  method: "POST",
    //  body: JSON.stringify({
    //    uris: tracks,
    //  }),
    //});
  },
};

async function get_playlists(bearer_token: string) {
  const playlists: Playlist[] = [];
  for (let i = 0; i < 10; i++) {
    let new_playlists: Playlist[] = (
      await (
        await fetch(PUBLIC_SPOTIFY_URL + `/v1/me/playlists?limit=50&offset=${i * 50}`, {
          headers: { Authorization: "Bearer " + bearer_token },
        })
      ).json()
    ).items;
    if (new_playlists.length === 0) {
      break;
    } else {
      playlists.push(...new_playlists);
    }
  }
  return playlists;
}
// TODO Too many requests needed each load. How to sort out only used genres?
// TODO Same issue with artists but smaller
//async function get_genres(bearer_token: string, playlists: Playlist[]) {
//  const genres: Genre_Help[] = [];
//  playlists.forEach(async (playlist) => {
//    const new_genres: Genre_Help = { genres: new Set<string>(), songs_by_genre: {} };
//    const tracks: { uri: string; artists: { href: string }[] }[] = await get_tracks(
//      bearer_token,
//      playlist.tracks,
//      "items(track(uri, artists.href))"
//    );
//    tracks.forEach((track) => {
//      track.artists.forEach(async (artist) => {
//        const artist_expanded: Artist = await (
//          await fetch(artist.href, { headers: { Authorization: "Bearer " + bearer_token } })
//        ).json();
//        artist_expanded.genres.forEach((genre) => {
//          new_genres.genres.add(genre);
//          if (Object.keys(new_genres.songs_by_genre).includes(genre)) {
//            new_genres.songs_by_genre[genre].push(track.uri);
//          } else {
//            new_genres.songs_by_genre[genre] = [track.uri];
//          }
//        });
//      });
//    });
//    genres.push(new_genres);
//  });
//  return genres;
//}

async function get_tracks(
  bearer_token: string,
  data: { href: string; total: number },
  track_filter: string = "items(track(uri))"
) {
  const return_tracks: any[] = [];
  for (let i = 0; i < data.total / 50; i++) {
    let params = new URLSearchParams({
      fields: track_filter,
      limit: Math.min(data.total - 50 * i, 50).toString(),
    });
    let tracks = await (
      await fetch(data.href + "?" + params.toString(), {
        headers: { Authorization: "Bearer " + bearer_token },
      })
    ).json();
    tracks.items.forEach((item: { track: any }) => return_tracks.push(item.track));
  }

  return return_tracks;
}
async function get_tracks_add_to_set(
  data: { href: string; total: number },
  combined_set: Set<string>,
  bearer_token: string
) {
  (await get_tracks(bearer_token, data)).forEach((track) => combined_set.add(track.uri));
}