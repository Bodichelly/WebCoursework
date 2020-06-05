import React, { Component } from "react";
import classes from "./../style/MainWindow.module.css";

import Home from "./Home";
import About from "./About";
import Contacts from "./Contacts";
import Services from "./Services";
import ScrollUpButton from "react-scroll-up-button";
import { Route, BrowserRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Header from "./Header";

import SignInModal from "./SignInModal"

class MainWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      buttonName: "Sign in",
      isLogged: false,
      pagerouters: [
        <Route
          key="default"
          render={() => <Redirect to={{ pathname: "/home" }} />}
        />,
        <Route key="home" path="/home" component={Home} />,
        <Route key="about" path="/about" component={About} />,
        <Route key="services" path="/services" component={Services} />,
        <Route key="contacts" path="/contacts" component={Contacts} />,
      ],
    };

    this.authorisationButtonClick = this.authorisationButtonClick.bind(this);
  }

  authorisationButtonClick() {
    if(this.state.isLogged){
      this.setState({
        buttonName: "Sign in",
        username: "",
        isLogged: false,
      })
    }
    else{

    }
  }

  render() {
    return (
      <BrowserRouter>
        <ScrollUpButton
          style={{ width: 35, height: 35 }}
          ToggledStyle={{ right: 60 }}
        />
        <div className={classes.MainWindow}>
          <header className={classes.header}>
            <h2>ERA Kyiv</h2>
            <div className={classes.signIn}>
              <p>{this.state.username}</p>
              <a
                href="#"
                onClick={this.authorisationButtonClick}
                className={classes.authorisationButton}
              >
                {this.state.buttonName}
              </a>
            </div>
          </header>
          <Header />
          {this.state.pagerouters}
          <SignInModal/>
          <footer className={classes.footer}></footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainWindow;
