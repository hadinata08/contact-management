import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ContactList from "./pages/contact/list";
import { Provider } from "react-redux";
import { store } from "./store";
import ContactAdd from "./pages/contact/add";
import ContactEdit from "./pages/contact/edit";
import ContactDetail from "./pages/contact/detail";

const router = createBrowserRouter([
  {
    path: "/contact/list",
    element: <ContactList />,
  },
  {
    path: "/contact/add",
    element: <ContactAdd />,
  },
  {
    path: "/contact/edit/:id",
    element: <ContactEdit />,
  },
  {
    path: "/contact/detail/:id",
    element: <ContactDetail />,
  },
  {
    path: "*",
    element: <Navigate to="/contact/list" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
