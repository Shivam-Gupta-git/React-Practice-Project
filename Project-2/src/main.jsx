import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from "./Components/Home.jsx";
import EmailFormList from "./Components/EmailFormList.jsx";

const router = createBrowserRouter([
  {
    path: '/', element:  <App />, children: [
    {path: '/', element: <Home/>},
    {path: 'VIA_EMAIL_FORM', element: <EmailFormList/>}]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>
);
