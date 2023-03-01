import React from 'react';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

function ViewAlbumDashboardPane({visible, data, closePane}) {

    const handleDeleteSong = (song) => {

    }

    return (
        <SlidingPane className="sliding-pane pt-lg-2 bg-gray-200 container border-radius-lg"
                     isOpen={visible}
                     title={''}
                     width={window.innerWidth < 600 ? "100%" : "1000px"}
                     onRequestClose={closePane}
                     hideHeader={true}
                     from="bottom"
        >

            <img src={data?.cover_image_url} className="img-fluid border-radius-lg shadow shadow-blur shadow-dark"
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
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div className="d-flex px-2 py-1">
                                    <div>
                                        <img
                                            src="/img/vinyl-record-isolated.jpg"
                                            className="avatar avatar-sm me-3"/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <h6 className="mb-0 text-xs">Title: Fall</h6>
                                        <p className="text-xs text-secondary mb-0">Genre: Pop</p>
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-normal">23/04/18</span>
                            </td>
                            <td className="align-middle">
                                <button className="btn btn-icon btn-sm btn-info"
                                        data-toggle="tooltip" data-original-title="Delete Album">
                                    <span className="btn-inner--text"><i
                                        className="material-icons text-lg me-2">visibility</i>View</span>
                                </button>
                                &nbsp;
                                &nbsp;
                                <button className="btn btn-icon btn-sm btn-success"
                                        data-toggle="tooltip" data-original-title="Delete Album">
                                    <span className="btn-inner--text"><i
                                        className="material-icons text-lg me-2">edit</i> Edit</span>
                                </button>
                                &nbsp;&nbsp;
                                <button className="btn btn-sm btn-danger"
                                        data-toggle="tooltip" data-original-title="Delete Album">
                                    <span className="btn-inner--text"><i
                                        className="material-icons text-lg me-2">delete</i>Delete</span>
                                </button>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </SlidingPane>
    );
}

export default ViewAlbumDashboardPane;
