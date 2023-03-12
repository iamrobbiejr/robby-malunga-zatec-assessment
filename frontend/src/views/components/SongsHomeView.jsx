import React, {useEffect, useState} from 'react';
import axiosClient from "../../axios.jsx";
import {css} from "@emotion/react";
import {BeatLoader} from "react-spinners";

const override = css`
    display: block;
    margin: 0 auto;
`;

function SongsHomeView(props) {

    const [songs, setSongs] = useState({data: [], meta: {links: []}});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        axiosClient.get('/songs')
            .then(res => {
                console.log("songs: ", res)
                setSongs(res.data)
            }).catch(err => {
            console.log(err)
            setSongs({data: [], meta: {links: []}})
        })

    }, [])

    const fetchSongs = (url) => {
        setLoading(true)
        axiosClient.get(url)
            .then(res => {
                setSongs(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setSongs({data: [], meta: {links: []}})
                setLoading(false)
            })
    }


    return (
        <>
            <div className="card row container p-5 m-lg-auto mb-5">
                <div className="table-responsive">
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
                    {!loading && (
                        <>
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
                                {songs.data.map((song, i) => (
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
                            <div className="row container mt-5">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        {songs.meta.links.map((link, i) => {
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
                                                            <a className="page-link"
                                                               onClick={() => fetchSongs(link.url)} tabIndex="-1">
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
                                                           onClick={() => fetchSongs(link.url)}>
                                                            {link.label}
                                                        </a>
                                                    </li>
                                                )
                                            } else if (link.active === false && link.label !== 'Next &raquo;') {
                                                return (
                                                    <li className="page-item">
                                                        <a className="page-link" onClick={() => fetchSongs(link.url)}>
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
                                                            <a className="page-link"
                                                               onClick={() => fetchSongs(link.url)}>
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
                        </>
                    )}

                </div>
            </div>
        </>
    );
}

export default SongsHomeView;
