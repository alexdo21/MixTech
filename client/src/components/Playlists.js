import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal'
import PlaylistSongs from '../components/PlaylistSongs'
import { allPlaylists, addPlaylist, deletePlaylist, getAllSongsInPlaylist } from '../actions/PlaylistActions'
import { connect } from 'react-redux'
import '../css/Playlists.css'

class Playlist extends Component {
    state = {
        openModal: false,
        songsModal: false,
        playlist: null,
        pname: '',
        description: ''
    }

    componentWillMount() {
        this.props.allPlaylists();
    };

    onOpenModal = () => {
        this.setState({ openModal: true })
    }

    onCloseModal = () => {
        this.setState({ openModal: false })
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            pname: this.state.pname,
            privacy: 0,
            description: this.state.description
        }
        this.props.addPlaylist(data)
        window.location.reload()
    }

    onOpenPlaylist = async (e) => {
        await this.setState({ playlist: e.target.selected })
        await this.props.getAllSongsInPlaylist(this.state.playlist.pid)
        this.setState({ songsModal: true })
    }

    onClosePlaylist = () => {
        this.setState({ songsModal: false })
    }


    clickHandler = async e => {
        await this.props.deletePlaylist(e.target.value)
        window.location.reload()
    }
    render() {
        return (
            <div id="playlistContent">
                <div id="playlistTitle">
                    <h1>My Playlists</h1>
                    <button className="btn btn-outline-primary btn-sm" onClick={this.onOpenModal}>Add Playlist</button>
                </div>
                <div id="playlistTable">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Playlist</th>
                                <th scope="col">Description</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.results.map((playlist, i) => 
                                <tr key={i}>
                                    <td><button className="btn btn-light btn-lg" selected={playlist} onClick={(e) => this.onOpenPlaylist(e)}>{playlist.pname}</button></td>
                                    <td>{playlist.description}</td>
                                    <td><button className="btn btn-outline-danger btn-sm" value={playlist.pid} onClick={this.clickHandler}>X</button></td>
                                </tr>     
                            )}
                        </tbody>
                    </table>
                </div>
                <Modal open={this.state.openModal} onClose={this.onCloseModal}>
                    <div className="container">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label>Playlist Name</label>
                                <input type="text" className="form-control" name="pname" onChange={this.handleChange}></input>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" name="description" onChange={this.handleChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Playlist</button>
                        </form>
                    </div>
                </Modal>
                <PlaylistSongs open={this.state.songsModal} onClose={this.onClosePlaylist} playlist={this.state.playlist} songs={this.props.songs}/>
            </div>
        );
    }
}

Playlist.propType = {
    allPlaylists: PropTypes.func.isRequired,
    addPlaylist: PropTypes.func,
    deletePlaylist: PropTypes.func,
    results: PropTypes.array,
    songs: PropTypes.array
};

const mapStateToProps = state => ({
    results: state.playlists.results,
    songs: state.playlists.songs
});

export default connect(mapStateToProps, { allPlaylists, addPlaylist, deletePlaylist, getAllSongsInPlaylist })(Playlist);