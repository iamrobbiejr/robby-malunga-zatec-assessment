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
    const [data, setData] = useState();

    const handleOnPaneClose = () => {
        setDetailsPane({visible: false, data: {title: '', description: '', release_date: '', songs: []}})
    }


    useEffect(() => {
        axiosClient.get('/albums?page=' + 1)
            .then(res => {
                console.log("home albums: ", res.data.data)
                if (res.data.data.data.length === 0) {
                    setAlbums([])
                    setData([])
                } else {
                    setAlbums(res.data.data.data)
                    setData(res.data.data)
                }

            })
            .catch(err => {
                console.log(err)
                setAlbums([])
                setData([])
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
                <div className="row container mt-4">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="page-link" href="javascript:;" tabIndex="-1">
                                    <i className="fa fa-angle-left"></i>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="javascript:;">1</a></li>
                            <li className="page-item active"><a className="page-link text-white"
                                                                href="javascript:;">2</a></li>
                            <li className="page-item"><a className="page-link" href="javascript:;">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="javascript:;">
                                    <i className="fa fa-angle-right"></i>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </>
    );
}

export default AlbumHomeView;
