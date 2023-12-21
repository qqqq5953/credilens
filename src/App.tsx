import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from '@/pages/Home'
import Cards from '@/pages/Cards'
import Edit from '@/pages/Edit'
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cards",
        element: <Cards />,
      },
      {
        path: "/edit",
        element: <Edit />,
      },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
