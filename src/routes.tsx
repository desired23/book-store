import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutClient from "./components/layouts/LayoutClient";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/product/ProductList";
import ProductAdd from "./pages/admin/product/ProductAdd";
import ProductEdit from "./pages/admin/product/ProductEdit";
import CategoryList from "./pages/admin/category/CategoryList";
import CategoryAdd from "./pages/admin/category/CategoryAdd";
import CategoryEdit from "./pages/admin/category/CategoryEdit";
import HomePage from "./pages/client/HomePage";
import VoucherAdd from "./pages/admin/voucher/VoucherAdd";
import VoucherList from "./pages/admin/voucher/VoucherList";
import VoucherEdit from "./pages/admin/voucher/VoucherEdit";
import ClientProductList from './pages/client/ProductList';
import ProductDetail from "./pages/client/ProductDetail";


export const router = createBrowserRouter([
    { path: "/", element: <LayoutClient />, children: [
        {index: true, element: <Navigate to={"home"}/>},
        {path:"home", element: <HomePage/>},
        {path:"products", element: <ClientProductList/>},
        {path:"products/:id", element: <ProductDetail/>},

        
    ] },
    { path: "/admin", element: <LayoutAdmin/>, children: [
        {index: true, element: <Navigate to={"dashboard"}/>},
        {path:"dashboard", element: <Dashboard/>},
        {path:"products", element: <ProductList/>},
        {path:"product/add", element: <ProductAdd/>},
        {path:"product/:id/edit", element: <ProductEdit/>},
        {path:"categories", element: <CategoryList/>},
        {path:"category/add", element: <CategoryAdd/>},
        {path:"category/:id/edit", element: <CategoryEdit/>},
        {path:"voucher/add", element: <VoucherAdd/>},
        {path:"vouchers", element: <VoucherList/>},
        {path:"voucher/:id/edit/:type", element: <VoucherEdit/>},
    ] },
])