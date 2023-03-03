import {createBrowserRouter} from 'react-router-dom';
import SignUp from "./views/auth/SignUp.jsx";
import Login from "./views/auth/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Home from "./views/Home.jsx";
import UpdateAlbum from "./views/components/forms/UpdateAlbum.jsx";
import AlbumDashboardView from "./views/components/AlbumDashboardView.jsx";
import SongsByGenre from "./views/components/SongsByGenre.jsx";
import UpdateSong from "./views/components/forms/UpdateSong.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <SignUp/>
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    },
    {
        path: '/update-album',
        element: <UpdateAlbum/>
    },
    {
        path: '/album',
        element: <AlbumDashboardView/>
    },
    {
        path: '/genre',
        element: <SongsByGenre/>
    },
    {
        path: '/update-song',
        element: <UpdateSong/>
    },
])

export default router;
