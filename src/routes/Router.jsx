import Main from "@/layouts/Main"
import Login from "@/pages/Authentication/Login/Login"
import NotFound from "@/pages/NotFound/NotFound"
import { createBrowserRouter } from "react-router-dom"


export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <Login />
         },
         {
            path: "/login",
            element: <Login />
         }
      ]

   },
   {
      path: "*",
      element: <NotFound />
   }
])

