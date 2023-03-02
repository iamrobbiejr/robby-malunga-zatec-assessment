import React from 'react';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

function AlbumPane({visible, data, closePane}) {
    return (
        <SlidingPane className="sliding-pane pt-lg-7 bg-gray-200"
                     isOpen={visible}
                     title={data?.title}
                     width={window.innerWidth < 600 ? "100%" : "600px"}
                     onRequestClose={closePane}
                     hideHeader={true}
        >

            <img src={import.meta.env.VITE_API_BASE_URL + "/" + data?.cover_image_url}
                 className="img-fluid border-radius-lg shadow shadow-blur shadow-dark"
                 style={{width: "100%", height: "35%"}}
                 alt=""/>
            <h4 className="text-dark pt-2">{data?.title}</h4>
            <p className="text-dark">{data?.description}</p>
            <p className="text-dark pb-4">Released: {data?.release_date}</p>
            <div className="card mt-3">
                <div className="card-header">
                    <h5 className="card-title">Songs available on the album</h5>
                </div>
                <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                        <thead>
                        <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                <i className="material-icons">timelapse</i>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.songs.map((song, i) => (
                            <tr key={i}>
                                <td>
                                    <div className="d-flex px-2 py-1">
                                        <div>
                                            <img
                                                src="/img/vinyl-record-isolated.jpg"
                                                className="avatar avatar-sm me-3"/>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <h6 className="mb-0 text-xs">Title: {song.title}</h6>
                                            <p className="text-xs text-secondary mb-0">Genre: {song.genre}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle text-center">
                                    <span className="text-secondary text-xs font-weight-normal">{song.length}</span>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>

        </SlidingPane>
    );
}

export default AlbumPane;
