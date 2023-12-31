import { createBrowserRouter, Navigate } from "react-router-dom";
import Binyanim from "../components/Binyanim/Binyanim";
import { RouterProvider } from 'react-router-dom';
import HomePage from "../components/HomePage/HomePage";
import BinyanPage from "../components/BinyanPage/BinyanPage";
import ApartmentPage from "../components/ApartmentPage/ApartmentPage";
import App from "../App";
import ROUTES from "./routes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />,
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