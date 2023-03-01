import React, {useEffect, useState} from 'react';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

function GenrePane({visible, genre, closePane}) {

    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(false)

    // get songs in the selected genre
    useEffect(() => {

        //     retrieve from api using genre prop

    }, [])

    return (
        <SlidingPane className="sliding-pane pt-lg-2 bg-gray-200 container border-radius-lg"
                     isOpen={visible}
                     title={''}
                     width={window.innerWidth < 600 ? "100%" : "1000px"}
                     onRequestClose={closePane}
                     hideHeader={true}
                     from="bottom"
        >
            <h1 className="text-dark pb-4">{genre}</h1>

            <div className="card mt-3">
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
                        {songs.length === 0 ? (
                            <tr>
                                <td></td>
                                <td colSpan={3}>
                                    <div className="container p-4 m-3">
                                        <h3 className="text-center">
                                            <img src="/img/search_black.png" alt=""/>
                                            No Songs
                                        </h3>
                                    </div>
                                </td>
                                <td></td>

                            </tr>
                        ) : (
                            <>
                                {songs.map((item, i) => (
                                    <tr>
                                        <td>
                                            <div className="d-flex px-2 py-1">
                                                <div>
                                                    <span className="material-icons">audiotrack</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.title}
                                        </td>
                                        <td>
                                            {item.genre}
                                        </td>
                                        <td>
                                            {item.album_id}
                                        </td>
                                        <td>
                                            {item.length}
                                        </td>
                                    </tr>
                                ))}
                            </>

                        )}


                        </tbody>
                    </table>
                </div>
            </div>

        </SlidingPane>
    );
}

export default GenrePane;
