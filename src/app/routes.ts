import { createBrowserRouter } from "react-router";
import { PageLayout } from "./components/layout/PageLayout";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { WorkDetail } from "./pages/WorkDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PageLayout,
    children: [
      { index: true, Component: Home },
      { path: "work", Component: Work },
      { path: "work/:slug", Component: WorkDetail },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "admin", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
]);