import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./routes/HomePage";
import ShowPost from "./routes/ShowPost";
import AddPost from "./routes/AddPost";
import EditPost from "./routes/EditPost";

async function fetchWeatherForecast() {
  const response = await fetch("/api/weatherforecast");
  const json = await response.json();
  return json;
}

function App() {
  useEffect(() => {
    fetchWeatherForecast().then((forecast) => {
      console.log(forecast);
    });
  });

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
