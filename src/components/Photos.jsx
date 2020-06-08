import React, { Component } from "react";
import classes from "./../style/Home.module.css";


class Photos extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  
  render() {
    return (
      <div className={classes.Home}>
        
      </div>
    );
  }
}

export default About;
