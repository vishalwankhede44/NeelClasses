import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import MenuButton from "./MenuButton";
import firebase from "../firebase";
import "../App.css";
import { useCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

const Navbar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies([
    "uid",
    "name",
    "mobile",
    "role",
  ]);
  const [loggedIn, setLogin] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    if ({ cookie }.cookie.name == undefined) {
      console.log("Log in first");
      setLogin(false);
      return false;
    } else {
      console.log("Already logged in");
      console.log({ cookie }.cookie.role);
      setLogin(true);
      return true;
    }
  }
  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        removeCookie("name");
        removeCookie("mobile");
        removeCookie("uid");
        removeCookie("role");
        console.log("Logout successfully");
        props.history.push("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (key) => {
    setMenuOpen(false);
    console.log(key)
    if (key === "Logout" && loggedIn) {
      logOut();
    }
  };
  const menu = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Contact",
      url: "/contact",
    },
    {
      name: "Courses",
      url: "/courses",
    },
    {
      name: "SignUp",
      url: "/signup",
    },
    {
      name: `${loggedIn ? "Logout" : "Login"}`,
      url: `${loggedIn ? "" : "/login"}`,
    },
  ];
  const menuItems = menu.map((Links, index) => {
    return (
      <MenuItem
        key={index}
        delay={`${index * 0.2}s`}
        onClick={handleLinkClick}
        url={Links.url}
        index={index}
      >
        {Links.name}
      </MenuItem>
    );
  });

  return (
    <div>
      <div className="nav-container">
        <div className="nav-brand">
          <p>NEEL <span className="nav-brand2">Classes</span></p>
        </div>
        <div className="menu">
          <MenuButton
            open={menuOpen}
            onClick={() => handleMenuClick()}
            color="#222831"
          />
        </div>
      </div>
      <Menu open={menuOpen}>{menuItems}</Menu>
    </div>
  );
};
export default withRouter(Navbar);
