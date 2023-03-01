/**
 * Home Page - First Screen - Guest Screen
 */

import React, {useState} from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import NavBar from "./views/includes/NavBar.jsx";
import AlbumHomeView from "./views/components/AlbumHomeView.jsx";
import SongsHomeView from "./views/components/SongsHomeView.jsx";
import GenreHomeView from "./views/components/GenreHomeView.jsx";

function App() {

    //   initialize variables
    const [albums, setAlbums] = useState([
        {
            'id': 1,
            'title': 'Album 1',
            'description': 'lorem ipsum dolor sit amet, consectetur adip',
            'cover_image_url': 'https://img.freepik.com/free-vector/realistic-music-record-label-disk-mockup_1017-33906.jpg?size=626&ext=jpg&uid=R6398802&ga=GA1.2.2073599072.1677000356&semt=ais',
            'release_date': '10-01-1998',
        },
        {
            'id': 1,
            'title': 'Album 2',
            'description': 'lorem ipsum dolor sit amet, consectetur adip',
            'cover_image_url': 'https://img.freepik.com/free-vector/vinyl-record-cover-design_1284-70516.jpg?w=996&t=st=1677674521~exp=1677675121~hmac=1485f64d9dfbd424385189cfb4434a39973bd46e88cfd9ec8739d21ab3998bf9',
            'release_date': '10-01-1998',
        }
    ]);
    const [genres, SetGenres] = useState([]); //list of most popular genres
    const [songs, setSongs] = useState([]);

    return (
        <>
            {/*    navbar component */}
            <NavBar/>
            {/*   end navbar component */}
            {/*    header section*/}
            <header className="header-2">
                <div className="page-header min-vh-35 relative"
                     style={{backgroundImage: "url(" + '/img/bg2.jpg' + ")"}}>
                    <span className="mask bg-gradient-secondary opacity-4"></span>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 text-center mx-auto">
                                <h1 className="text-white pt-3 mt-n5">Music Platform</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*    end header*/}
            <div className="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="position-relative border-radius-xl overflow-hidden mb-7">
                            <div className="container border-bottom">
                                <div className="row justify-space-between py-2">
                                    <div className="col-lg-12">
                                        <div className="nav-wrapper position-relative end-0">
                                            <ul className="nav nav-pills nav-fill flex-row p-1" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab"
                                                       href={"#albums-tab"} role="tab" aria-controls="preview"
                                                       aria-selected="true">
                                                        <i className="fa fa-solid fa-record-vinyl"></i>&nbsp; Albums
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link mb-0 px-0 py-1" data-bs-toggle="tab"
                                                       href={"#genre-tab"} role="tab" aria-controls="code"
                                                       aria-selected="false">
                                                        <i className="fa fa-solid fa-layer-group text-sm me-2"></i>&nbsp; Genres
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link mb-0 px-0 py-1" data-bs-toggle="tab"
                                                       href={"#songs-tab"} role="tab" aria-controls="code"
                                                       aria-selected="false">
                                                        <i className="fa fa-solid fa-music"></i>&nbsp; Songs
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-content tab-space">
                                <div className="tab-pane active" id="albums-tab">
                                    <>
                                        <div className="row">
                                            <h2 className=" p-3 mt-2">Albums</h2>
                                        </div>
                                        {/*    albums section */}
                                        <AlbumHomeView albums={albums}/>
                                        {/*   end albums section */}
                                    </>
                                </div>
                                <div className="tab-pane" id="genre-tab">
                                    <>
                                        <div className="row">
                                            <h2 className=" p-3 mt-2">Genres</h2>
                                        </div>
                                        {/*    genre section */}
                                        <GenreHomeView/>
                                        {/*  end  genre section */}
                                    </>
                                </div>
                                <div className="tab-pane" id="songs-tab">
                                    <>
                                        <div className="row">
                                            <h2 className=" p-3 mt-2">Songs</h2>
                                        </div>
                                        {/*    songs section */}
                                        <SongsHomeView/>
                                        {/*  end  songs section */}
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
  )
}

export default App
