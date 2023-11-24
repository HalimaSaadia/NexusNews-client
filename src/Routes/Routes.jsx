import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Payment from "../pages/Dashboard/Payment/Payment";
import AddArticle from "../pages/AddArticle/AddArticle";

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
        },
        {
          path: "/addArticle",
          element:<AddArticle />
        }
    ]
  },
  {
    path:"/dashboard",
    element: <Payment />
  }
]);

export default router;
