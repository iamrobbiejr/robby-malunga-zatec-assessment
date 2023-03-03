import React, {useEffect, useState} from 'react';
import "react-sliding-pane/dist/react-sliding-pane.css";
import axiosClient from "../../axios.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import AddSong from "./forms/AddSong.jsx";
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/react";
import router from "../../router.jsx";
import NavBar from "../includes/NavBar.jsx";
import ToastService from 'react-material-toast';

const toast = ToastService.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});

const override = css`
    display: block;
    margin: 0 auto;
`;

function AlbumDashboardView() {
    const {currentUser, userToken, setUserToken, setCurrentUser} = useStateContext();
    const [addSongPane, setAddSongPane] = useState({visible: false, data: ''})
    const [songs, setSongs] = useState([])
    const [songsLoading, setSongsLoading] = useState(false);
    const [album, setAlbum] = useState({})

    const handleOnAddPaneClose = () => {
        setAddSongPane({visible: false})
    }

    const getAllSongs = () => {
        setSongsLoading(true);
        const result = JSON.parse(localStorage.getItem('album'))
        //     retrieve albums
        axiosClient.get('/songs/' + result.id)
            .then(res => {
                console.log("data: ", res.data)
                setSongs(res.data.data);
                setSongsLoading(false);
            }).catch((err) => {
            console.error(err);
            setSongs([])
            setSongsLoading(false);
        })
    }

    useEffect(() => {
        setAlbum(JSON.parse(localStorage.getItem('album')))
        console.log("album loaded: ", JSON.parse(localStorage.getItem('album')))
        getAllSongs()

    }, [])

    const handleOnSuccessAddClose = () => {
        getAllSongs()
        setAddSongPane({visible: false})
    }

    function openEditForm(data) {
        console.log("clicked: ", data)
        localStorage.setItem('songId', data.id);
        router.navigate('/update-song')
    }


    const handleDeleteSong = (song) => {
        setSongsLoading(true)
        axiosClient.delete('/song/' + song.id)
            .then((res) => {
                console.log(res)
                toast.success('Song Deleted', () => {
                    console.log('closed')
                    getAllSongs()
                })
            }).catch(err => {
            console.log(err)
            toast.error('Operation failed, Please try again', () => {
                console.log('closed')
            })
            setSongsLoading(false)
        })

    }

    return (
        <>
            {/*    navbar component */}
            <NavBar currentUser={currentUser} userToken={userToken} setUserToken={setUserToken}
                    setCurrentUser={setCurrentUser}/>
            {/*   end navbar component */}

            {/*    add sliding pane to addSong */}
            <AddSong visible={addSongPane.visible} closePane={handleOnAddPaneClose} album={addSongPane.data}
                     closeAfterSuccessPane={handleOnSuccessAddClose}/>
            {/* end pane */}
            {/*    header section*/}
            <header className="header-2">
                <div className="page-header min-vh-35 relative"
                     style={{backgroundImage: "url(" + '/img/bg2.jpg' + ")"}}>
                    <span className="mask bg-gradient-secondary opacity-4"></span>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 text-center mx-auto">
                                <h1 className="text-white pt-3 mt-n5">Music Platform: Dashboard</h1>
                                <p className="text-white">Manage your albums and songs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*    end header*/}
            <div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
                <div className="row p-3">
                    <div className="col-md-3">
                        <ul className="breadcrumb">
                            <li><a href={'/dashboard'} className="cursor-pointer"><h5>Albums</h5></a></li>
                            &nbsp; |&nbsp;
                            <li><h6 className="text-secondary">Manage Album</h6></li>
                        </ul>
                    </div>

                </div>
                <div className="p-4">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/${album?.cover_image_url}`}
                                 className="img-fluid border-radius-lg shadow shadow-blur shadow-dark"
                                 style={{width: "80%", height: "60%"}}
                                 alt=""/>
                            <h4 className="text-dark pt-2">{album?.title}</h4>
                            <p className="text-dark">{album?.description}</p>
                            <p className="text-dark pb-2">Released: {album?.release_date}</p>
                        </div>
                        <div className="col-md-8">
                            {songsLoading && (
                                <div className="container ml-lg-8 p-lg-4">
                                    <BeatLoader
                                        color={"#E53371"}
                                        loading={songsLoading}
                                        cssOverride={override}
                                        size={30}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"/>

                                </div>

                            )}
                            {!songsLoading && (
                                <div className="card mt-0">
                                    <div className="card-header">
                                        <h5 className="card-title">Songs available on the album</h5>
                                    </div>

                                    <div className="col-md-3 p-3">
                                        <button onClick={() => setAddSongPane({visible: true, data: album})}
                                                className="btn btn-icon btn-2 btn-sm btn-primary">
                                            <span className="btn-inner--icon"><i
                                                className="ni ni-button-play"></i></span>
                                            <span className="btn-inner--text">Add New Song</span>
                                        </button>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table align-items-center mb-0">
                                            <thead>
                                            <tr>
                                                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#</th>
                                                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                    <i className="material-icons">timelapse</i>
                                                </th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {songs.map((item, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <img
                                                                    src="/img/vinyl-record-isolated.jpg"
                                                                    className="avatar avatar-sm me-3"/>
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">Title: {item?.title}</h6>
                                                                <p className="text-sm text-secondary mb-0">Genre: {item?.genre}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle text-center">
                                                        <span
                                                            className="text-secondary text-sm font-weight-normal">{item?.length}</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <button onClick={() => openEditForm(item)}
                                                                className="btn btn-icon btn-sm btn-success"
                                                                data-toggle="tooltip"
                                                                data-original-title="Delete Album">
                                    <span className="btn-inner--text"><i
                                        className="material-icons text-lg me-2">edit</i> Edit</span>
                                                        </button>
                                                        &nbsp;&nbsp;
                                                        <button onClick={() => handleDeleteSong(item)}
                                                                className="btn btn-sm btn-danger"
                                                                data-toggle="tooltip"
                                                                data-original-title="Delete Album">
                                    <span className="btn-inner--text"><i
                                        className="material-icons text-lg me-2">delete</i>Delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>


                </div>


            </div>
        </>
    );
}

export default AlbumDashboardView;
