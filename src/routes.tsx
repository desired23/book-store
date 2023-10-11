import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutClient from "./components/layouts/LayoutClient";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/product/ProductList";
import ProductAdd from "./pages/admin/product/ProductAdd";
import ProductEdit from "./pages/admin/product/ProductEdit";

export const router = createBrowserRouter([
    { path: "/", element: <LayoutClient /> },
    { path: "/admin", element: <LayoutAdmin/>, children: [
        {index: true, element: <Navigate to={"dashboard"}/>},
        {path:"dashboard", element: <Dashboard/>},
        {path:"products", element: <ProductList/>},
        {path:"products/add", element: <ProductAdd/>},
        {path:"products/:id/edit", element: <ProductEdit/>},


    ] },
])