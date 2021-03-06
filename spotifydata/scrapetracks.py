import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd

"""
Script to scrape all songs from list of albums retrieved from billboard top 200's (scrapebillboard.py)
"""

# set up spotipy wrapper
client_credentials_manager = SpotifyClientCredentials(client_id="ae1c25b01ed94b4cb0b48cd1e679f051", client_secret="8a9d601440204112b46c1d3e4d0d26e4")
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

df = pd.read_csv('./album_ids.csv')
album_ids = df['album_ids']

track_ids = [] # track ids to search
track_names = [] # track name for outputted dataframe
popularity = [] # the popularity of tracks
album_names = []
bad_albums = []

i, j = 0, 20


while i < len(album_ids):
    album = sp.album(album_ids[i])
    album_tracks = []
    
    for track in album['tracks']['items']:
        album_names.append(album['name'])
        track_ids.append(track['id'])
        album_tracks.append(track['id'])
        track_names.append(track['name'])
    try:
        popularity.extend(list(map(lambda x: x['popularity'], sp.tracks(album_tracks)['tracks'])))
    except Exception as err:
        print(album_names)
        print(track_names)
        print(err)

    i += 1


    # except spotipy.client.SpotifyException as err:
    #     print(err)
    #     bad_albums.append(album_ids[i])
    #     i += 1
    #     continue

data = {'track_ids': track_ids, 'track_names': track_names, 'album_names': album_names,'popularity': popularity}
df = pd.DataFrame(data)
df.drop_duplicates(subset=['track_ids'], inplace=True)
grouped = df.groupby(['track_ids'], as_index=True).size()

if grouped[grouped > 1].count() != 0:
    print("uh oh")

df.to_csv('track_ids.csv')