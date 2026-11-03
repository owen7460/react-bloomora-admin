import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Summary from "@/pages/Summary";
import Signup from "@/pages/Signup";
import Suppliers from "@/pages/Suppliers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
      {
        path: "suppliers",
        element: <Suppliers />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
