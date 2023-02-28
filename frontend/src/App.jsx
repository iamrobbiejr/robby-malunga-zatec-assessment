/**
 * Home Page - First Screen - Guest Screen
 */

import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import NavBar from "./views/partials/NavBar.jsx";

function App() {

  //   initialize variables
    const [albums, setAlbums] = useState([]);
    const [genres, SetGenres] = useState([]); //list of most popular genres
    const [songs, setSongs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    {/*    navbar component */}
        <NavBar />
        {/*   end navbar component */}

    {/*    albums section */}
        {/*   end albums section */}

    {/*    genre section */}
        {/*  end  genre section */}

    {/*    songs section */}
        {/*  end  songs section */}
    </>
  )
}

export default App
