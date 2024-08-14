import Dashboard from "@/layouts/Dashboard"
import Main from "@/layouts/Main"
import Login from "@/pages/Authentication/Login/Login"
import ContentContainer from "@/pages/Dashboard/ContentContainer"
import NotFound from "@/pages/NotFound/NotFound"
import { createBrowserRouter } from "react-router-dom"


export const router = createBrowserRouter([
   // {
   //    path: "/",
   //    element: <Main />,
   //    children: [
   //       {
   //          path: "/",
   //          element: <Login />
   //       },
   //       {
   //          path: "/login",
   //          element: <Login />
   //       }
   //    ]

   // },
   {
      path: "/",
      element: <Dashboard />,
      children: [
         {
            path: "/",
            element: <ContentContainer />
         },
      ]

   },
   {
      path: "/app",
      element: <Dashboard />,
      children: [
         {
            path: "/app",
            element: <ContentContainer />
         },
      ]

   },
   {
      path: "*",
      element: <NotFound />
   }
])

