import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Trasaction from "./pages/Trasaction";
import Navbar from "./components/fragments/navbar";
import Report from "./pages/Report";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Happy Working</div>,
    },
    {
        path: "/transaction",
        element: (
            <div>
                <Navbar />
                <Trasaction />
            </div>
        ),
    },
    {
        path: "/login",
        element: (
            <div>
                <Navbar />
                <Login />
            </div>
        ),
        path: "/report",
        element: (
            <div>
                <Navbar />
                <Report />
            </div>
        ),
    },
]);

export { router };
