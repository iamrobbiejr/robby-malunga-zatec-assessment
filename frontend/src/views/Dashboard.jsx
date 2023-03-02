/**
 * Dashboard Screen
 *
 */

import React, {useState} from 'react';
import NavBar from "./includes/NavBar.jsx";
import ViewAlbumDashboardPane from "./components/partials/ViewAlbumDashboardPane.jsx";
import UpdateAlbumDashboardPane from "./components/partials/UpdateAlbumDashboardPane.jsx";
import {useStateContext} from "./contexts/ContextProvider.jsx";
import AddAlbum from "./components/forms/AddAlbum.jsx";

const Dashboard = () => {
    const {currentUser, userToken, setUserToken, setCurrentUser} = useStateContext();

    // initialize global variables
    const [detailsPane, setDetailsPane] = useState({visible: false, data: {}})
    const [updateDetailsPane, setUpdateDetailsPane] = useState({visible: false, data: {}})
    const [addAlbumPane, setAddAlbumPane] = useState({visible: false})
    const [albums, setAlbums] = useState([]);
    const [request, setRequest] = useState({});
    const handleOnPaneClose = () => {
        setDetailsPane({visible: false, data: {}})
    }

    const handleOnAddPaneClose = () => {
        setAddAlbumPane({visible: false})
    }

    const handleOnUpdatePaneClose = () => {
        setUpdateDetailsPane({visible: false, data: {}})
    }

    const handleChange = name => ({target: {value}}) => {
        setRequest({...request, [name]: value})
    }

    const handleUpdateAlbum = () => {

    }
    const handleDeleteAlbum = (album) => {

    }

    return (
        <>
            {/*    add sliding pane to view clicked album details */}
            <AddAlbum visible={addAlbumPane.visible} closePane={handleOnAddPaneClose}/>
            {/* end pane */}
            {/*    add sliding pane to view clicked album details */}
            <ViewAlbumDashboardPane visible={detailsPane.visible} data={detailsPane.data}
                                    closePane={handleOnPaneClose}/>
            {/* end pane */}
            {/*    add sliding pane to edit clicked album details */}
            <UpdateAlbumDashboardPane visible={updateDetailsPane.visible} data={updateDetailsPane.data}
                                      closePane={handleOnUpdatePaneClose}/>
            {/* end pane */}
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
                        <h3>Albums</h3>
                    </div>

                </div>
                <div className="row mt-3 p-3">
                    <div className="col-md-3">
                        <button onClick={() => setAddAlbumPane({visible: true})}
                                className="btn btn-icon btn-2 btn-sm btn-primary">
                            <span className="btn-inner--icon"><i className="ni ni-button-play"></i></span>
                            <span className="btn-inner--text">Add New Album</span>
                        </button>
                    </div>
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table align-items-center mb-0">
                                <thead>
                                <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Title</th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Released</th>
                                    <th className="text-secondary opacity-7"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {albums.map((item, i) => (
                                    <tr>
                                        <td>
                                            <div className="d-flex px-2 py-1">
                                                <div>
                                                    <img
                                                        src={item?.cover_image_url}
                                                        className="avatar avatar-lg me-3"/>
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h6 className="mb-0 text-xs">{item?.title}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle text-center text-sm">
                                            <p>{item?.description}</p>
                                        </td>

                                        <td className="align-middle text-center">
                                            <span
                                                className="text-secondary text-xs font-weight-normal">{item?.release_date}</span>
                                        </td>
                                        <td className="align-middle">
                                            <button onClick={() => setDetailsPane({visible: true, data: item})}
                                                    className="btn btn-icon btn-sm btn-info"
                                                    data-toggle="tooltip" data-original-title="Delete Album">
                                                <span className="btn-inner--text"><i
                                                    className="material-icons text-lg me-2">visibility</i>View</span>
                                            </button>
                                            &nbsp;
                                            &nbsp;
                                            <button onClick={() => setUpdateDetailsPane({visible: true, data: item})}
                                                    className="btn btn-icon btn-sm btn-success"
                                                    data-toggle="tooltip" data-original-title="Delete Album">
                                                <span className="btn-inner--text"><i
                                                    className="material-icons text-lg me-2">edit</i> Edit</span>
                                            </button>
                                            &nbsp;&nbsp;
                                            <button onClick={() => handleDeleteAlbum(item)}
                                                    className="btn btn-sm btn-danger"
                                                    data-toggle="tooltip" data-original-title="Delete Album">
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
                </div>
            </div>
            {/*    Modals */}

        </>
    );
}

export default Dashboard;
