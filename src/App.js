import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./routes/HomePage";
import ShowPost from "./routes/ShowPost";
import AddPost from "./routes/AddPost";
import EditPost from "./routes/EditPost";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/:id",
      element: <ShowPost />,
    },
    {
      path: "/add",
      element: <AddPost />,
    },
    {
      path: "/edit/:id",
      element: <EditPost />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
