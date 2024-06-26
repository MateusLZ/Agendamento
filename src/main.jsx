import * as React from "react"
import * as ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Agenda from './Pages/Agenda/Agenda'
import AcessoNegado from "./Pages/AcessoNegado/AcessoNegado.jsx"
import Funcionarios from "./Pages/Funcionarios/Funcionarios"
import Profile from "./Pages/Config/Config"
import Servicos from "./Pages/Servicos/Servicos"
import LoadingScreen from "./components/Loading/LoadingScreen .jsx"
import ErrorPage from "./error-page"
import {UserProvider} from "./Context/Provider.jsx"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx"



const router = createBrowserRouter([
  {
    path: "/Agendamento/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Agendamento//home",
    element: (
      <ProtectedRoute allowedRoles={['USER']}>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },{
    path:"loading",
    element: <LoadingScreen/>,
    errorElement: <ErrorPage />,
  }, {
    path: "/Agendamento//agenda",
    element: (
      <ProtectedRoute allowedRoles={['USER', 'ADMIN','FUNCIONARIO']}>
        <Agenda />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },{
    path: "/Agendamento//funcionarios",
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <Funcionarios />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },{
    path: "/Agendamento//perfil",
    element: (
      <ProtectedRoute allowedRoles={['USER', 'ADMIN','FUNCIONARIO']}>
        <Profile />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },{
    path: "/Agendamento//servicos",
    element: (
      <ProtectedRoute allowedRoles={['USER', 'ADMIN','FUNCIONARIO']}>
        <Servicos />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/Agendamento//acesso-negado",
    element: <AcessoNegado />,
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>

    <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
)