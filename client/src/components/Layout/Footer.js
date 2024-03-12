import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebook} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const Information = [
    {title:"About Us", link:"/about"},
    {title:"Contact Us", link:"/contact"},
    {title: "Career", link:"/career"},
    {title: "Privacy Policy", link:"/policy"},
    {title: "Blogs", link:"/blogs"},
    {title: "Get Help", link:"/get-help"},
];

const Account = [
  {title: "My Account", link:"/profile"},
  {title: "Whishlist", link:"/cart"},
  {title: "Track Order", link:"/cart"},
];




const Footer = () => {
  return (
    <div className="footer">
        <div className=" footer-child w-75 m-auto flex justify-content-evenly">
          <div className="flex flex-column gap-3">
            <p>Useful Link</p>
            <div className="link flex flex-column gap-[10px]">
              {
                Information.map((item, index) => (
                  <Link to={item.link} key={index}>
                    {item.title}
                  </Link>
                ))
              }
            </div>
          </div>

          <div className="flex flex-column gap-3">
            <p>Account</p>
            <div className="flex flex-column  gap-3">
              {
                Account.map((item, index) => (
                  <NavLink to={item.link} key={index}>
                    {item.title}
                  </NavLink>
                ))
              }
            </div>
          </div>

          <div className="flex flex-column  align-items-center justify-content-center ">
            <p>Follow Us</p>
            <div className=" social-media text-white">
               <NavLink to="/">
                  <FaFacebook/>
               </NavLink>
               <NavLink to="/">
                <FaXTwitter/>
               </NavLink>
               <NavLink to="/">
                  <FaLinkedin/>
               </NavLink>
               <NavLink to="/">
                  <FaInstagram/>
               </NavLink>
               <NavLink to="/">
                  <FaYoutube/>
               </NavLink>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Footer;
