import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Agenda from './Pages/Agenda/Agenda';
import Funcionarios from "./Pages/Funcionarios/Funcionarios";
import Profile from "./Pages/Profile/Profile";
import Servicos from "./Pages/Servicos/Servicos";
import LoadingScreen from "./components/Loading/LoadingScreen .jsx";
import ErrorPage from "./error-page";
import {UserProvider} from "./Context/Provider.jsx"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path:"home",
    element: <Home/>,
    errorElement: <ErrorPage />,
  },{
    path:"loading",
    element: <LoadingScreen/>,
    errorElement: <ErrorPage />,
  },{
    path:"agenda",
    element: <Agenda/>,
    errorElement: <ErrorPage />,
  },{
    path:"funcionarios",
    element: <Funcionarios/>,
    errorElement: <ErrorPage />,
  },{
    path:"perfil",
    element: <Profile/>,
    errorElement: <ErrorPage />,
  },{
    path:"servicos",
    element: <Servicos/>,
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>

    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);