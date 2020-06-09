import React, { Component } from "react";
import classes from "./../style/MainWindow.module.css";

import Home from "./Home";
import About from "./About";
import Contacts from "./Contacts";
import Services from "./Services";
import Photos from "./Photos"
import ScrollUpButton from "react-scroll-up-button";
import { Route, BrowserRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Header from "./Header";

import SignInModal from "./SignInModal"
import { signin } from "../services/helpers/auth"
import { auth } from "../services/firebase";
import ServiceCreate from "./ServiceCreate"

import Loader from "./Loader"

class MainWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      buttonName: "Sign in",
      isLogged: false,
      showSignInModal: false,
      showLoader: false,
      user: {},
      pagerouters: [
        <Route
          key="default"
          render={() => <Redirect to={{ pathname: "/home" }} />}
        />,
        //()=><Services servicesType="repair" />
        <Route key="home" path="/home" component={Home} />,
        <Route key="about" path="/about" component={About} />,
        <Route key="repair" path="/repair" servicesType="repair" component={()=><Services servicesType="repair" />} />,
        <Route key="rent" path="/rent" servicesType="rent" component={()=><Services servicesType="rent" />} />,
        <Route key="sale" path="/sale" servicesType="sale" component={()=><Services servicesType="sale" />} />,
        <Route key="contacts" path="/contacts" component={Contacts} />,
        <Route key="photos" path="/photos" component={Photos} />,
      ],
    };

    this.authorisationButtonClick = this.authorisationButtonClick.bind(this);
    this.signIn = this.signIn.bind(this);
    this.cancel = this.cancel.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.setLoaderStatus = this.setLoaderStatus.bind(this);
  }
  setLoaderStatus(shouldBeDisplayed){
    this.setState({
      showLoader: shouldBeDisplayed,
    })
  }
  componentDidMount() {
    this.unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.setState({
          user: currentUser,
          isLogged: true,
          username: currentUser.email || "",
          buttonName: "Log out",
          setLoaderStatus: false
        })
      }
    })
  }
  
  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  checkUsername(email) {
    let username = email;
    while (1) {
      if (username == username.replace('&', "&amp;")) { break; }
      username = username.replace('&', "&amp;");
    }
    while (1) {
      if (username == username.replace('"', "&quot;")) { break; }
      username = username.replace('"', "&quot;");;
    }
    while (1) {
      if (username == username.replace("'", "&#039;")) { break; }
      username = username.replace("'", "&#039;");
    }
    while (1) {
      if (username == username.replace('<', "&lt;")) { break; }
      username = username.replace('<', "&lt;");
    }
    while (1) {
      if (username == username.replace('>', "&gt;")) { break; }
      username = username.replace('>', "&gt;");
    }
    while (1) {
      if (username == username.replace('@', "&#64;")) { break; }
      username = username.replace('@', "&#64;");
    }
    while (1) {
      if (username == username.replace('>', "&gt;")) { break; }
      username = username.replace('>', "&gt;");
    }
    while (1) {
      if (username == username.replace(')', "&#41;")) { break; }
      username = username.replace(')', "&#41;");
    }
    while (1) {
      if (username == username.replace('(', "&#40;")) { break; }
      username = username.replace('(', "&#40;");
    }
    return username;

  }
  cancel() {
    this.setState({
      showSignInModal: false,
    })
  }
  async signIn(email, password, successCalback) {
    this.setLoaderStatus(true);
    try {
      await signin(email, password);
    } catch (error) {
      console.log(error);
      successCalback(false);
      this.setLoaderStatus(false);
      return;
    }
    successCalback(true);
    this.setState({
      showSignInModal: false,
      isLogged: true,
      username: auth().currentUser.email,
      buttonName: "Log out",
      user: auth().currentUser,
    }, ()=>{
      this.setLoaderStatus(false);
    })
    console.log(auth().currentUser);
  }

  authorisationButtonClick() {
    if (this.state.isLogged) {
      this.setState({
        buttonName: "Sign in",
        username: "",
        isLogged: false,
        user: null,
      })
      auth().signOut().then(() => {

        console.log("logout");
      })
        .catch((err) => {
          console.log("bad logout");
          console.log(err);
        });
    }
    else {
      this.setState({
        showSignInModal: true,
      })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <ScrollUpButton
          style={{ width: 35, height: 35 }}
          ToggledStyle={{ right: 60 }}
        />
        { this.state.showLoader ? <Loader />: null}
        <div className={classes.MainWindow}>
          <header className={classes.header}>
            <h2>ERA Kyiv</h2>
            <div className={classes.signIn}>
              <p>{this.state.username}</p>
              <a
                onClick={this.authorisationButtonClick}
                className={classes.authorisationButton}
              >

                {this.state.buttonName}
              </a>
            </div>
          </header>
          <Header isLogged={this.state.isLogged}/>
          {this.state.pagerouters}
          {this.state.isLogged ? <Route key="servicecreate" path="/servicecreate" component={()=><ServiceCreate />} />: null}
          {this.state.showSignInModal ? <SignInModal cancel={this.cancel} signIn={this.signIn} /> : null}

          <footer className={classes.footer}></footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default MainWindow;
