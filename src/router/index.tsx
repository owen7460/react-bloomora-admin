import { createBrowserRouter } from "react-router-dom";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Summary from "@/pages/Summary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Summary />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);

export default router;
