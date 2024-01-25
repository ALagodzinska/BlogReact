import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./routes/HomePage";
import ShowPost from "./routes/ShowPost";
import AddPost from "./routes/AddPost";
import EditPost from "./routes/EditPost";
import Login from "./routes/Login";
import { UserProvider } from "./user.context";

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
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
