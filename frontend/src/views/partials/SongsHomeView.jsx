import React from 'react';

function SongsHomeView(props) {
    return (
        <>
            <div className="row container p-5 m-lg-auto">
                <table className="table-borderless table-striped">
                    <thead>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Album</th>
                    <th>Date Added</th>
                    <th><span rel="tooltip"
                              title="duration" data-placement="top" className="cursor-pointer"><i
                        className="material-icons">timelapse</i></span></th>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SongsHomeView;
