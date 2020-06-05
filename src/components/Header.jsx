import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./../style/Header.module.css";
import headerImg from "./../pictures/headerImg.jpg";

class Header extends Component {
  render() {
    return (
      <header>
        
        <div className={classes.Header}>
          <img src={headerImg} className={classes.eraImg} alt="" />
          {/* <div className={classes.wrapper} >
          <span className={classes.menuSpan}>Menu</span>
        </div> */}

          {/* <img src={menuImg} className={classes.menuImg} alt="" /> */}

          <nav>
            <NavLink className={classes.Navlink} to="/home">
              Home
            </NavLink>

            <NavLink className={classes.Navlink} to="/about">
              About
            </NavLink>

            <span className={classes.Navlink} to="#">
              Services
              <div className={classes.dropdownContent}>
                <NavLink  className={classes.Navlink} to="/services">
                  Repair
                </NavLink>
                <NavLink  className={classes.Navlink} to="/services">
                  Rent
                </NavLink>
                <NavLink  className={classes.Navlink} to="/services">
                  Sale
                </NavLink>
              </div>
            </span>

            <NavLink className={classes.Navlink} to="/contacts">
              Contacts
            </NavLink>

            <NavLink className={classes.Navlink} to="#">
              Page 5
            </NavLink>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
