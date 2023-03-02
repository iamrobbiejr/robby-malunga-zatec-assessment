import React, {useEffect, useState} from 'react';
import "react-sliding-pane/dist/react-sliding-pane.css";
import {css} from "@emotion/react";
import axiosClient from "../../../axios.jsx";
import {BeatLoader} from "react-spinners";
import NavBar from "../../includes/NavBar.jsx";
import {useStateContext} from "../../contexts/ContextProvider.jsx";

const override = css`
    display: block;
    margin: 0 auto;
`;


function UpdateSong() {

    const {currentUser, userToken, setUserToken, setCurrentUser} = useStateContext();
    const [request, setRequest] = useState({
        id: '',
        title: '',
        description: '',
        cover_image_url: '',
        release_date: '',
        user_id: ''
    });

    const [songLoading, setSongLoading] = useState(false);

    const [error, setError] = useState("");
    const genres = ['Pop', 'Afro', 'Soul', 'R & B', 'Rock', 'Country', 'Gospel', 'Reggae']

    const handleUpdateSong = (e) => {
        setSongLoading(true)
        e.preventDefault()

        let payload = {...request};

        console.log("payload: ", payload);

        //     post request to api
        axiosClient.put("/song/" + payload.id, payload)
            .then(res => {
                console.log(res)
                setSongLoading(false)
            })
            .catch(err => {
                console.log(err)
                setSongLoading(false)
            })

    }

    useEffect(() => {
        setSongLoading(true)
        //     retrieve album details
        axiosClient.get('/song/' + localStorage.getItem('songId'))
            .then(res => {
                console.log(res)
                setRequest({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    cover_image_url: res.data.cover_image_url,
                    release_date: res.data.release_date,
                    user_id: res.data.user_id
                })
                setSongLoading(false)
            }).catch(err => {
            console.log(err)
            setSongLoading(false)
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
                            <li><h6 className="text-secondary">Update Song</h6></li>
                        </ul>

                    </div>

                </div>
                <div className="row mt-3 p-3">

                    <div className="card ">
                        {songLoading && (
                            <div className="container ml-lg-8 p-lg-4">
                                <BeatLoader
                                    color={"#E53371"}
                                    loading={songLoading}
                                    cssOverride={override}
                                    size={30}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"/>

                            </div>

                        )}
                        {!songLoading && (
                            <form action="PUT" onSubmit={handleUpdateSong} className="p-4">

                                <div className="input-group input-group-static mb-4 mt-4">
                                    <label>Song Title</label>
                                    <input type="text" className="form-control"
                                           value={request.title}
                                           onChange={(ev) =>
                                               setRequest({...request, title: ev.target.value})
                                           }
                                    />
                                </div>
                                <div className="input-group input-group-static mb-4">
                                    <label htmlFor="exampleFormControlSelect1" className="ms-0">Genre</label>
                                    <select className="form-control" id="exampleFormControlSelect1" onChange={(ev) =>
                                        setRequest({...request, genre: ev.target.value})
                                    }>
                                        {genres.map((genre, i) => (
                                            <option key={i} value={genre}>{genre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-group input-group-static my-3">
                                    <label>Duration</label>
                                    <input type="text" className="form-control" value={request.release_date}
                                           onChange={(ev) =>
                                               setRequest({...request, release_date: ev.target.value})
                                           }/>
                                </div>
                                <div className="input-group input-group-static my-3">
                                    <label>Album</label>
                                    <input type="date" className="form-control" value={request.release_date}
                                           onChange={(ev) =>
                                               setRequest({...request, release_date: ev.target.value})
                                           }/>
                                </div>
                                <button className="btn btn-sm btn-primary" type="submit"><i
                                    className="fa fa-paper-plane text-sm fa-2x">&nbsp;Submit</i></button>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateSong;
