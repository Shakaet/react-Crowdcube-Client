
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './components/MainLayout.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Provider, { AuthContext } from './components/Provider.jsx';
import AddCamPains from './components/AddCamPains.jsx';
import AllCampaign from './components/AllCampaign.jsx';
import Details from './components/Details.jsx';
import MCampaign from './components/MCampaign.jsx';
import MyDonation from './components/MyDonation.jsx';
import UpdateCampaign from './components/UpdateCampaign.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './components/PrivateRoute.jsx';
import ErrorPages from './components/ErrorPages.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPages></ErrorPages>,
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/allcampaign",
        element:<AllCampaign></AllCampaign>,
        loader:()=>fetch("https://react-firebase-mongo-node-server.vercel.app/addcampaign")
      },
      {
        path:"/addnewcampaign",
        element:<PrivateRoute><AddCamPains></AddCamPains></PrivateRoute>
      },
      {
        path:"/details/:id",
        element:<PrivateRoute><Details></Details></PrivateRoute>,
        loader:({params})=>fetch(`https://react-firebase-mongo-node-server.vercel.app/addcampaign/${params.id}`)
      },
      {
        path:"/updateCampaign/:id",
        element:<UpdateCampaign></UpdateCampaign>
      },
      {
        path: "/myCampaigns",
        element:<PrivateRoute><MCampaign></MCampaign></PrivateRoute>,
    },
    {
      path: "/myDonation",
      element:<PrivateRoute><MyDonation></MyDonation></PrivateRoute>,
      loader:()=>fetch("https://react-firebase-mongo-node-server.vercel.app/donated-collection")
    },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      }
    ]
  
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider>
     <RouterProvider router={router} />
     <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </Provider>,
)
