
/**
 * Actions mapping to the playlist route and calling various functionalities.
 * Dispatches to PlaylistReducer.js to change playlist state.
 */


/**
 * Gets a list of all playlists.
 */
export const allPlaylists = () => dispatch => {
    fetch(`http://localhost:8080/playlist/all/${localStorage.getItem('uid')}`, {
        method: 'GET',
        crossDomain: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(res => {
            const results = res.map(playlist => ({
                pid: playlist.pid,
                pname: playlist.pname,
                privacy: playlist.privacy,
                description: playlist.description
            }));
            dispatch({
                type: "ALL_PLAYLISTS",
                payload: results
            })
        }).catch(err => {console.log(err)});

};

/**
 * Gets all the songs in a given playlist.
 * @param {*} pid 
 */
export const getAllSongsInPlaylist = (pid) => dispatch => {
    fetch(`http://localhost:8080/playlist_song/all/${pid}`, {
        method: 'GET',
        crossDomain: true,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(res => {
        const songs = res.map(song => ({
            id: song.spotifyID,
            name: song.sname,
            album_name: song.albumName,
            artist: song.mname,
            danceability: song.danceability,
            energy: song.energy,
            key: song.skey,
            loudness: song.loudness,
            mode: song.smode,
            speechiness: song.speechiness,
            acousticness: song.acousticness,
            instrumentalness: song.instrumentalness,
            liveness: song.liveness,
            valence: song.valence,
            tempo: song.tempo,
            duration: song.durationMs,
            timesignature: song.timeSignature,
            popularity: song.popularity
         }))
         dispatch({ 
            type: 'GET_ALL_SONGS_IN_PLAYLIST',
            payload: songs
        })
    }).catch(err => console.log(err))
}

/**
 * Creates new playlist given appropriate data.
 * @param {*} data 
 */
export const addPlaylist = (data) => dispatch => {
    fetch(`http://localhost:8080/playlist/create/${localStorage.getItem('uid')}`, {
        method: 'POST',
        crossDomain: true,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(dispatch({ type: 'ADD_PLAYLIST' }))
    .catch(err => console.log(err))
}


/**
 * Adds a song to a given playlist id and song id.
 * @param {*} req 
 */
export const addToExistingPlaylist = (req) => dispatch => {
    fetch(`http://localhost:8080/playlist_song/add/${req.playlistID}?spotify_uri=${req.songID}`, {
            method: 'PUT',
            crossDomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => console.log(res))
        .then(dispatch({ type: 'ADD_TO_EXISTING_PLAYLIST' }))
        .catch(err => console.log(err))
}

/**
 * Deletes the given playlist id.
 * @param {*} pid 
 */
export const deletePlaylist = (pid) => dispatch => {
    fetch(`http://localhost:8080/playlist/delete/${localStorage.getItem('uid')}/${pid}`, {
            method: 'DELETE',
            crossDomain: true,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(dispatch({ type: 'DELETE_PLAYLIST' }))
        .catch(err => console.log(err))
}