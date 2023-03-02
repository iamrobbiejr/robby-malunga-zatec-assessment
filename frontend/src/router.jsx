import { createBrowserRouter } from 'react-router-dom';
import SignUp from "./views/auth/SignUp.jsx";
import Login from "./views/auth/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Home from "./views/Home.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
      path: '/register',
      element: <SignUp />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    }
])

export default router;
