import React, {useState} from 'react';
import GenrePane from "./partials/GenrePane.jsx";
import router from "../../router.jsx";

function GenreHomeView(props) {

    const genres = ['Pop', 'Afro', 'Soul', 'R & B', 'Rock', 'Country', 'Gospel', 'Reggae']


    return (
        <>

            <div className="row">
                {genres.map((item, i) => (
                    <div key={i} className=" col-lg-3 col-md-6 col-sm-6 col-xs-12 "
                         onClick={() => {
                             localStorage.setItem('genre', item)
                             router.navigate('/genre')
                         }}>
                        <a className="cursor-pointer" onClick={() => {
                            localStorage.setItem('genre', item)
                            router.navigate('/genre')
                        }}
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
