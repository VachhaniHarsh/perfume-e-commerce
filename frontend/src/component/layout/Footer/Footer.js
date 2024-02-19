import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Quick Links</h4>
        <a href="null">Home</a> 
        <a href="null">My Account</a>
        <a href="null">Contact Us</a>
      </div>

      <div className="midFooter">
        <h1>OdeurX.</h1>
        <p>Scent of Sophistication</p>
        <p>Copyrights 2024 &copy; OdeurX</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="null">Instagram</a>
        <a href="null">Youtube</a>
        <a href="null">Facebook</a>
       </div>
          
        <div className="rightFooter">
            <h4>About us</h4>
              <p>
                OdeurX is an independent perfume e-commerce platform created to help customers find their scents.
              </p>
              <p>
                OdeurX is a wholly independent entity from the manufacturers and brand owners of the fragrances we offer.
              </p>
        </div>
    </footer>
  );
};

export default Footer;