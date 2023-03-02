import React, {useEffect, useState} from 'react';
import {useStateContext} from "../contexts/ContextProvider.jsx";
import NavBar from "../includes/NavBar.jsx";
import axiosClient from "../../axios.jsx";
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/react";

const override = css`
    display: block;
    margin: 0 auto;
`;

function SongsByGenre() {
    const {currentUser, userToken, setUserToken, setCurrentUser} = useStateContext();
    const [genre, setGenre] = useState('')
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        let result = localStorage.getItem('genre')
        setGenre(result)
        //     retrieve songs by genre
        axiosClient.get('/genre/' + result)
            .then(res => {
                console.log(res)
                setSongs(res.data.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setSongs([])
                setLoading(false)
            })

    }, [])

    return (
        <>
            {/*    navbar component */}
            <NavBar currentUser={currentUser} userToken={userToken} setUserToken={setUserToken}
                    setCurrentUser={setCurrentUser}/>
            {/*   end navbar component */}
            {/*    header section*/}
            <header className="header-2">
                <div className="page-header min-vh-35 relative"
                     style={{backgroundImage: "url(" + '/img/bg2.jpg' + ")"}}>
                    <span className="mask bg-gradient-secondary opacity-4"></span>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 text-center mx-auto">
                                <h1 className="text-white pt-3 mt-n5">Music Platform</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*    end header*/}
            <div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
                <div className="row mt-3">
                    <div className="col-12">
                        {loading && (
                            <div className="container ml-lg-8 p-lg-4">
                                <BeatLoader
                                    color={"#E53371"}
                                    loading={loading}
                                    cssOverride={override}
                                    size={30}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"/>

                            </div>

                        )}
                        {!loading && (
                            <div className="position-relative border-radius-xl overflow-hidden mb-7">
                                <div className="row p-3">
                                    <div className="col-md-3">
                                        <ul className="breadcrumb">
                                            <li><a href={'/'} className="cursor-pointer"><h5>Home</h5></a></li>
                                            &nbsp; |&nbsp;
                                            <li><h5 className="text-secondary">Genre: {genre}</h5></li>
                                        </ul>

                                    </div>

                                </div>

                                <div className="card row container p-5 m-lg-auto">
                                    <div className="table-responsive">
                                        <table className="table align-items-center mb-0">
                                            <thead>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Genre</th>
                                            <th>
                            <span rel="tooltip"
                                  title="duration" data-placement="top" className="cursor-pointer"><i
                                className="material-icons">timelapse</i></span></th>
                                            </thead>
                                            <tbody>
                                            {songs.map((song, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                            <div>
                                                                <span className="material-icons">audiotrack</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {song.title}
                                                    </td>
                                                    <td>
                                                        {song.genre}
                                                    </td>
                                                    <td>
                                                        {song.length}
                                                    </td>
                                                </tr>
                                            ))}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SongsByGenre;
