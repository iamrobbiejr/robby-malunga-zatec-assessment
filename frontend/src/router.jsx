import { createBrowserRouter } from 'react-router-dom';
import App from "./App.jsx";
import SignUp from "./views/auth/SignUp.jsx";
import Login from "./views/auth/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
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
