import { createBrowserRouter } from "react-router-dom";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

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
]);

export default router;
