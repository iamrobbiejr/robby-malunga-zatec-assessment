import React, {useEffect, useState} from 'react';
import axiosClient from "../../axios.jsx";

function SongsHomeView(props) {

    const [songs, setSongs] = useState([]);

    useEffect(() => {

        axiosClient.get('/songs')
            .then(res => {
                console.log("songs: ", res)
                setSongs(res.data.data)
            }).catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <>
            <div className="card row container p-5 m-lg-auto">
                <div className="table-responsive">
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
                        {songs.map((song, i) => (
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
                </div>
            </div>
        </>
    );
}

export default SongsHomeView;
