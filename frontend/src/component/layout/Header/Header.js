import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/OdeurX.jpg"


const Header = () => {
    return (
        <ReactNavbar
            burgerColor="black"
            burgerColorHover="red"
            navColor1="#FAF1F1" 
            logo={logo}
            logoWidth="200px"
            logoHeight="200px"
            logoHoverSize="25px"
            logoHoverColor="red"
            link1Text="Home"
            link2Text="Products"
            link3Text="Contact"
            link4Text="About"

            link1Url="/"
            link2Url="/product"
            linke3Url="/contact"
            link4Url="/about"

            link1Margin="1vmax"
            link2Margin="1vmax"
            link3Margin="1vmax"

            link1ColorHover="red"
            link2ColorHover="red"
            link3ColorHover="red"
            link4ColorHover="red"

            nav1justifyContent="flex-end"
            nav2justifyContent="flex-end"
            nav3justifyContent="flex-start"
            nav4justifyContent="flex-start"
        />
  )
}

export default Header;
