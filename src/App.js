import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./routes/HomePage";
import ShowPost from "./routes/ShowPost";
import AddPost from "./routes/AddPost";
import EditPost from "./routes/EditPost";
import Login from "./routes/Login";
import { UserProvider } from "./user.context";
import {
  PrivateRouteLoggedIn,
  PrivateRouteLoggedOut,
} from "./components/privateRoutes.component";
import RestorePost from "./routes/RestorePost";
import Layout from "./Layout";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/:id",
          element: <ShowPost />,
        },
        {
          element: <PrivateRouteLoggedOut />,
          children: [
            {
              path: "/add",
              element: <AddPost />,
            },
            {
              path: "/edit/:id",
              element: <EditPost />,
            },
            {
              path: "/restore",
              element: <RestorePost />,
            },
          ],
        },
        {
          element: <PrivateRouteLoggedIn />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
