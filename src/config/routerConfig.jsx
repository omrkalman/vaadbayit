import { createBrowserRouter, Navigate } from "react-router-dom";
import Binyanim from "../components/Binyanim/Binyanim";
import { RouterProvider } from 'react-router-dom';
import BinyanPage from "../components/BinyanPage/BinyanPage";
import ApartmentPage from "../components/ApartmentPage/ApartmentPage";
import App from "../App";

export const ROUTES = {
    Binyanim: '/binyanim',
    BinyanPage: '/binyan/:id',
    ApartmentPage: '/binyan/:binyanId/apartment/:apartmentId',
    NotFound: '/404'
}


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Navigate to={ROUTES.Binyanim} />,
            },
            {
                path: ROUTES.Binyanim,
                element: <Binyanim />
            },
            {
                path: ROUTES.BinyanPage,
                element: <BinyanPage />
            },
            {
                path: ROUTES.ApartmentPage,
                element: <ApartmentPage />
            },
            {
                path: ROUTES.NotFound,
                element: <h1>This page doesn't exist</h1>
            },
            {
                path: '*',
                element: <Navigate to={ROUTES.NotFound} />
            }
        ]
    }, 
]);

function MyRouter() {
    return (
        <RouterProvider router={router} />
    )
}

export default MyRouter;