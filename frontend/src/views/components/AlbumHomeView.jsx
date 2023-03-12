import React, {useEffect, useState} from 'react';
import AlbumPane from "./partials/AlbumPane.jsx";
import axiosClient from "../../axios.jsx";
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/react";

const override = css`
    display: block;
    margin: 0 auto;
`;

function AlbumHomeView(props) {

    // initialize variables
    const [detailsPane, setDetailsPane] = useState({
        visible: false, data: {
            title: '', description: '', release_date: '', songs: []
        }
    })
    const [albums, setAlbums] = useState({data: [], links: []});
    const [loading, setLoading] = useState(false);

    const handleOnPaneClose = () => {
        setDetailsPane({visible: false, data: {title: '', description: '', release_date: '', songs: []}})
    }

    // pagination function
    const fetchAlbums = (url) => {
        setLoading(true)
        axiosClient.get(url)
            .then(res => {
                if (res.data.data.data.length === 0) {
                    setAlbums({data: []})
                    setLoading(false)
                } else {
                    setAlbums(res.data.data)
                    setLoading(false)
                }

            })
            .catch(err => {
                console.log(err)
                setAlbums({data: []})
                setLoading(false)
            })
    }


    useEffect(() => {
        setLoading(true)
        //get initial albums
        if (!props.albums) {
            setAlbums([])
        } else {
            setAlbums(props.albums);
        }

        setLoading(false)
    }, [])

    return (
        <>
            {/*    add sliding pane to view clicked album details */}
            <AlbumPane visible={detailsPane.visible} data={detailsPane.data} closePane={handleOnPaneClose}/>
            {/* end pane */}
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
            {loading && (albums === null || albums === undefined) && (
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
                <div className="row">

                    {/*loop through the albums*/}
                    {albums.data.map((item, i) => (
                        <div key={i} className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                             onClick={() => setDetailsPane({visible: true, data: item})}>
                            <div className="container mt-sm-5">
                                <div className="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
                                     style={{backgroundImage: "url(" + import.meta.env.VITE_API_BASE_URL + '/' + item.cover_image_url + ")"}}
                                     loading="lazy">
                                    <span className="mask bg-gradient-dark"></span>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12 ms-lg-5">
                                                <h4 className="text-white">{item.title}</h4>
                                                <p className="text-white">{item.description}</p>

                                                <a onClick={() => setDetailsPane({visible: true, data: item})}
                                                   className="text-white icon-move-right">
                                                    View Album
                                                    <i className="fas fa-arrow-right text-sm ms-1"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="row container mt-4">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                {albums.links.map((link, i) => {
                                    if (link.label === '&laquo; Previous') {
                                        if (link.url === null) {
                                            return (
                                                <li className="page-item disabled">
                                                    <a className="page-link" tabIndex="-1">
                                                        <i className="fa fa-angle-left"></i>
                                                        <span className="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li className="page-item">
                                                    <a className="page-link" onClick={() => fetchAlbums(link.url)}
                                                       tabIndex="-1">
                                                        <i className="fa fa-angle-left"></i>
                                                        <span className="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                            )
                                        }

                                    } else if (link.active === true) {
                                        return (
                                            <li className="page-item active">
                                                <a className="page-link text-white"
                                                   onClick={() => fetchAlbums(link.url)}>
                                                    {link.label}
                                                </a>
                                            </li>
                                        )
                                    } else if (link.active === false && link.label !== 'Next &raquo;') {
                                        return (
                                            <li className="page-item">
                                                <a className="page-link" onClick={() => fetchAlbums(link.url)}>
                                                    {link.label}
                                                </a>
                                            </li>
                                        )
                                    } else if (link.label === 'Next &raquo;') {
                                        if (link.url === null) {
                                            return (
                                                <li className="page-item disabled">
                                                    <a className="page-link">
                                                        <i className="fa fa-angle-right"></i>
                                                        <span className="sr-only">Next</span>
                                                    </a>
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li className="page-item">
                                                    <a className="page-link" onClick={() => fetchAlbums(link.url)}>
                                                        <i className="fa fa-angle-right"></i>
                                                        <span className="sr-only">Next</span>
                                                    </a>
                                                </li>
                                            )
                                        }

                                    }

                                })}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}

export default AlbumHomeView;
