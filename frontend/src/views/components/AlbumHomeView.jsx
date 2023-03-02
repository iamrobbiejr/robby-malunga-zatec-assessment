import React, {useEffect, useState} from 'react';
import AlbumPane from "./partials/AlbumPane.jsx";
import axiosClient from "../../axios.jsx";

function AlbumHomeView(props) {

    // initialize variables
    const [detailsPane, setDetailsPane] = useState({
        visible: false, data: {
            title: '', description: '', release_date: '', songs: []
        }
    })
    const [albums, setAlbums] = useState([]);

    const handleOnPaneClose = () => {
        setDetailsPane({visible: false, data: {title: '', description: '', release_date: '', songs: []}})
    }

    useEffect(() => {

        axiosClient.get('/albums')
            .then(res => {
                console.log("albums: ", res)
                setAlbums(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return (
        <>
            {/*    add sliding pane to view clicked album details */}
            <AlbumPane visible={detailsPane.visible} data={detailsPane.data} closePane={handleOnPaneClose}/>
            {/* end pane */}
            <div className="row">
                {/*loop through the albums*/}
                {albums.map((item, i) => (
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

            </div>

        </>
    );
}

export default AlbumHomeView;
