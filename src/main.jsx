import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./component/Header.jsx";
import "./index.css";
import App from "./App.jsx";
import CreateTrip from "./component/CreateTrip.jsx";
import { Toaster } from "sonner";
import ViewTrip from "./component/ViewTrip.jsx";

// Layout component
function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster position="top-center" richColors />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RootLayout>
          <App />
        </RootLayout>
      </>
    ),
  },
  {
    path: "/create-trip", // Fixed typo (optional)
    element: (
      <>
        <RootLayout>
          <CreateTrip />
        </RootLayout>
      </>
    ),
  },
  {
    path: "/view-trip/:tripId", // Fixed typo (optional)
    element: (
      <>
        <RootLayout>
          <ViewTrip />
        </RootLayout>
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
