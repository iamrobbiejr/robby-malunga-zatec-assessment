import React from 'react';

function SongsHomeView(props) {
    return (
        <>
            <div className="card row container p-5 m-lg-auto">
                <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                        <thead>
                        <th></th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Album</th>
                        <th><span rel="tooltip"
                                  title="duration" data-placement="top" className="cursor-pointer"><i
                            className="material-icons">timelapse</i></span></th>
                        </thead>
                        <tbody>

                        <tr>
                            <td>
                                <div className="d-flex px-2 py-1">
                                    <div>
                                        <span className="material-icons">audiotrack</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Fall
                            </td>
                            <td>
                                Afro Soul
                            </td>
                            <td>
                                Album 1
                            </td>
                            <td>
                                4 min 20 sec
                            </td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default SongsHomeView;
