import React, {useEffect, useState} from 'react';
import "react-sliding-pane/dist/react-sliding-pane.css";
import {css} from "@emotion/react";
import axiosClient from "../../../axios.jsx";
import {BeatLoader} from "react-spinners";
import NavBar from "../../includes/NavBar.jsx";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
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


function UpdateAlbum() {

    const {currentUser, userToken, setUserToken, setCurrentUser} = useStateContext();
    const [request, setRequest] = useState({
        id: '',
        title: '',
        description: '',
        cover_image_url: '',
        release_date: '',
        user_id: ''
    });

    const [albumLoading, setAlbumLoading] = useState(false);

    const [error, setError] = useState("");

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];
        console.log("files: ", file);

        const reader = new FileReader();
        reader.onload = () => {

            setRequest({
                ...request,
                // image: file,
                cover_image_url: reader.result,
            });

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
        console.log("readAsDataURL: ", reader);
    };

    const handleUpdateAlbum = (e) => {
        setAlbumLoading(true)
        e.preventDefault()

        let payload = {...request};

        console.log("payload: ", payload);

        //     post request to api
        axiosClient.put("/album/" + payload.id, payload)
            .then(res => {
                console.log(res)
                toast.success('Album Updated', () => {
                    console.log('closed')
                })
                setAlbumLoading(false)
            })
            .catch(err => {
                console.log(err)
                toast.error('Operation Failed,Please try again', () => {
                    console.log('closed')
                })
                setAlbumLoading(false)
            })

    }

    useEffect(() => {
        setAlbumLoading(true)
        //     retrieve album details
        axiosClient.get('/album/' + localStorage.getItem('albumId'))
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
                setAlbumLoading(false)
            }).catch(err => {
            console.log(err)
            setAlbumLoading(false)
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
                            <li><h6 className="text-secondary">Update Album</h6></li>
                        </ul>

                    </div>

                </div>
                <div className="row mt-3 p-3">

                    <div className="card ">
                        {albumLoading && (
                            <div className="container ml-lg-8 p-lg-4">
                                <BeatLoader
                                    color={"#E53371"}
                                    loading={albumLoading}
                                    cssOverride={override}
                                    size={30}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"/>

                            </div>

                        )}
                        {!albumLoading && (
                            <form action="PUT" onSubmit={handleUpdateAlbum} className="p-4">
                                {/*Image*/}
                                <div className="card p-1">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-6 container">
                                        <label>Album Cover</label>
                                        <div className="fileinput fileinput-new " data-provides="fileinput">
                                            <div className="fileinput-new thumbnail img-raised">
                                                {request.cover_image_url.includes('data:image') ? (
                                                    <img
                                                        src={request.cover_image_url}
                                                        alt="..." width="400px" height="250px"/>
                                                ) : (
                                                    <img
                                                        src={import.meta.env.VITE_API_BASE_URL + '/' + request?.cover_image_url}
                                                        alt="..." width="400px" height="250px"/>
                                                )}

                                            </div>
                                            <div
                                                className="fileinput-preview fileinput-exists thumbnail img-raised"></div>

                                            <div>
                                <span className="btn btn-raised btn-round btn-sm btn-file">
                                    <input type="file" name="..." className="btn btn-sm btn-dark p-2"
                                           onChange={onImageChoose} accept="image/png, image/gif, image/jpeg"/>
                                </span>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/*Image*/}

                                <div className="input-group input-group-static mb-4 mt-4">
                                    <label>Album Title</label>
                                    <input type="text" className="form-control"
                                           value={request.title}
                                           onChange={(ev) =>
                                               setRequest({...request, title: ev.target.value})
                                           }
                                    />
                                </div>
                                <div className="input-group input-group-static mb-4">
                                    <label>Description</label>
                                    <input type="text" className="form-control" value={request.description}
                                           onChange={(ev) =>
                                               setRequest({...request, description: ev.target.value})
                                           }/>
                                </div>
                                <div className="input-group input-group-static my-3">
                                    <label>Release Date</label>
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

export default UpdateAlbum;
