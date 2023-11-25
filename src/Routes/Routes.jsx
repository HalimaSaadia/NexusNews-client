import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Payment from "../pages/Dashboard/Payment/Payment";
import AddArticle from "../pages/AddArticle/AddArticle";
import AllArticles from "../pages/AllArticles/AllArticles";
import Details from "../pages/Details/Details";
import MyArticles from "../pages/MyArticles/MyArticles";

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
          path:"/articles",
          element: <AllArticles />

        },
        {
          path:"/details/:id",
          element:<Details />
        },
        {
          path: "/addArticle",
          element:<AddArticle />
        },
        {
          path:"/myArticles",
          element: <MyArticles />
        }
    ]
  },
  {
    path:"/dashboard",
    element: <Payment />
  }
]);

export default router;
