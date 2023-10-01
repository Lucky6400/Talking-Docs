
import Form from './pages/Form';
import Home from './pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Chats from './pages/Chats';
import PDFList from './pages/PDFList';
import Pricing from './pages/Pricing';
import Account from './pages/Account';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
  {
    path: "/pdfs",
    element: <PDFList />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/account",
    element: <Account />,
  },
]);

function App() {
  return (
    <>
      <div className="mt-20">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
