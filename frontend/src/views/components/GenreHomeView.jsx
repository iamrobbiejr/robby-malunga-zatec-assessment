import React, {useState} from 'react';
import GenrePane from "./partials/GenrePane.jsx";

function GenreHomeView(props) {

    const genres = ['Pop', 'Afro', 'Soul', 'R & B', 'Rock', 'Country', 'Gospel', 'Reggae']

    const [detailsPane, setDetailsPane] = useState({visible: false, genre: ''})
    const handleOnPaneClose = () => {
        setDetailsPane({visible: false, genre: ''})
    }

    return (
        <>
            {/*    add sliding pane to view clicked album details */}
            <GenrePane visible={detailsPane.visible} genre={detailsPane.genre} closePane={handleOnPaneClose}/>
            {/* end pane */}
            <div className="row">
                {genres.map((item, i) => (
                    <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12 "
                         onClick={() => setDetailsPane({visible: true, genre: item})}>
                        <a className="cursor-pointer" onClick={() => setDetailsPane({visible: true, genre: item})}
                        >
                            <div className="container mt-sm-5">
                                <div className="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
                                     style={{backgroundImage: "url(" + '/img/bg6.jpg' + ")"}}
                                     loading="lazy">
                                    <span className="mask bg-gradient-dark"></span>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12 ms-lg-5">
                                                <h3 className="text-white ">{item}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}

            </div>
        </>
    );
}

export default GenreHomeView;
