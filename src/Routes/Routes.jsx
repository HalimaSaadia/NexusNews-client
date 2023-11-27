import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Payment from "../pages/Dashboard/Payment/Payment";
import AddArticle from "../pages/AddArticle/AddArticle";
import AllArticles from "../pages/AllArticles/AllArticles";
import Details from "../pages/Details/Details";
import MyArticles from "../pages/MyArticles/MyArticles";
import Home from "../pages/Home/Home/Home";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/Allusers";
import Articles from "../pages/Dashboard/Articles/Articles";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:'/',
        element: <Home />
      },
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
          element:<PrivateRoute><Details /></PrivateRoute>
        },
        {
          path: "/addArticle",
          element:<PrivateRoute><AddArticle /></PrivateRoute>
        },
        {
          path:"/myArticles",
          element:<PrivateRoute> <MyArticles /></PrivateRoute>
        },{
          path:"/profile",
          element: <Profile />
        } 
    ]
  },
  {
    path:"dashboard",
    element: <AdminRoute><Dashboard /></AdminRoute>,
    children:[
      {
        path:'allUsers',
        element:<AllUsers />
      },
      {
        path: 'articles',
        element: <Articles />
      },
     {
      path:'add-publisher',
      element:<AddPublisher />
     },
   
    ]
  }
]);

export default router;
