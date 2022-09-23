import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm,
  CFormInput,
  CButton,
} from "@coreui/react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [navbarBackground, setNavbarBackground] = useState(false);

  //Cambio de fondo de transparente a negro
  const changeBackground = () => {
    if (window.scrollY >= 680) {
      setNavbarBackground(true);
    } else {
      setNavbarBackground(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  return (
    <CNavbar className={navbarBackground ? "active fixed-top" : "fixed-top"}>
      <CContainer fluid>
        <CNavbarBrand href="#" className="d-flex ">
          <h3 className="textHackFlix">
            {" "}
            <Link className="link" to="/">
              {" "}
              <span>Hack flix</span>
            </Link>
          </h3>

          <div
            type="submit"
            color="secondary"
            className="form-search"
            variant="outline"
          >
            <Link to="/search" className="link-search">
              <BsSearch />
            </Link>
          </div>
        </CNavbarBrand>
      </CContainer>
    </CNavbar>
  );
};
