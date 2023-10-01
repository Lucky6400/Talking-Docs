import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,

} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export default function FixedNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navigate = useNavigate();

  const navList = (
    <ul className="mb-4 z-90 mt-2 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
      {!token ? <></> : <>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/chats" className="flex items-center">
            Chats
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/pdfs" className="flex items-center">
            PDFs
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/form" className="flex items-center">
            Upload
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/account" className="flex items-center">
            Account
          </Link>
        </Typography>
      </>}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/pricing" className="flex items-center">
          Pricing
        </Link>
      </Typography>

    </ul>
  );

  return (

    <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 px-4 md:px-8 md:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Talking Docs
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden md:block">{navList}</div>
          {!token ?
            <Button
              variant="gradient"
              onClick={() => navigate("/signin")}
              size="sm"
              className="hidden md:inline-block"
            >
              <span>Sign In</span>
            </Button>
            :
            <Button
              variant="gradient"
              onClick={() => {
                localStorage.removeItem("token")
                navigate("/")
              }}
              size="sm"
              className="hidden md:inline-block"
            >
              <span>Sign out</span>
            </Button>
          }

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        <Button onClick={() => navigate("/signin")} variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Sign In</span>
        </Button>
      </Collapse>
    </Navbar>

  );
}