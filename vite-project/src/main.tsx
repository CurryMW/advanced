import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import baseRouter from "./router/creatBroserRouter.tsx";
import App from "./App.tsx";
import "./components/Message";
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RouterProvider router={baseRouter}></RouterProvider>
  // </StrictMode>
);
