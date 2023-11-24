import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Payment from "../pages/Dashboard/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        }
    ]
  },
  {
    path:"/dashboard",
    element: <Payment />
  }
]);

export default router;
