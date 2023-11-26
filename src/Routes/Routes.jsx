import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Payment from "../pages/Dashboard/Payment/Payment";
import AddArticle from "../pages/AddArticle/AddArticle";
import AllArticles from "../pages/AllArticles/AllArticles";
import Details from "../pages/Details/Details";
import MyArticles from "../pages/MyArticles/MyArticles";
import EditArticle from "../pages/MyArticles/EditArticle";
import Home from "../pages/Home/Home/Home";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/Allusers";
import Articles from "../pages/Dashboard/Articles/Articles";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
          element:<Details />
        },
        {
          path: "/addArticle",
          element:<AddArticle />
        },
        {
          path:"/myArticles",
          element: <MyArticles />
        },{
          path:"/profile",
          element: <Profile />
        } 
    ]
  },
  {
    path:"dashboard",
    element: <Dashboard />,
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
     }
    ]
  }
]);

export default router;
