import { createBrowserRouter, Navigate } from "react-router-dom";
import Binyanim from "../components/Binyanim/Binyanim";
import { RouterProvider } from 'react-router-dom';
import BinyanPage from "../components/BinyanPage/BinyanPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={'/binyanim'} />,
    }, 
    {
        path: '/binyanim',
        element: <Binyanim />
    },
    {
        path: '/binyan/:id',
        element: <BinyanPage />
    },
    {
        path: '*',
        element: <h1>This page doesn't exist</h1>
    }
]);

function MyRouter() {
    return (
        <RouterProvider router={router} />
    )
}

export default MyRouter;