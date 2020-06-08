import React, { Component } from "react";
import classes from "./../style/SignInModal.module.css";

class SigInModal extends Component {
  constructor(props){
    super(props);
    this.state= {
      emailInput: "",
      passwordInput: "",
      errorMessage: "",
    }
    this.onEmailInput = this.onEmailInput.bind(this);
    this.onPasswordInput = this.onPasswordInput.bind(this);
    this.applyButtonClick = this.applyButtonClick.bind(this);
    this.checkSuccessCallback = this.checkSuccessCallback.bind(this);
  
  }
  checkSuccessCallback(isAuthorised){
    if(!isAuthorised){
      this.setState({
        errorMessage: "No such user",
      });
    }
    else{
      this.setState({
        errorMessage: ""
      });
    }
  }
  applyButtonClick(){
    if(this.state.emailInput.length>5 && this.state.passwordInput.length>5)
      {
        this.props.signIn(this.state.emailInput, this.state.passwordInput, this.checkSuccessCallback);
      }
    else{
      this.setState({
        errorMessage: "Incorrect Email or Password"
      });
    }
  }
  onEmailInput(event){
    this.setState({
      emailInput: event.target.value,
    });
  }
  onPasswordInput(event){
    this.setState({
      passwordInput: event.target.value,
    });
  }
  render() {
    return (
      <div className={classes.modalContainer}>
        <div className={classes.modalBox}>
          <div className={classes.modalContent}>
            <h2>Sign in</h2>
            <p>Email</p>
            <input type="email" className={classes.signinInput} value={this.state.emailInput} onChange={this.onEmailInput}></input>
            <p>Password</p>
            <input type="password" className={classes.signinInput} value={this.state.passwordInput} onChange={this.onPasswordInput}></input>
            <span className={classes.errorMessage}>{this.state.errorMessage}</span>
            <div className={classes.buttons}>
              <a className={classes.applyButton} onClick={this.applyButtonClick}>
                Sign In
              </a>
              <a className={classes.cancelButton} onClick={this.props.cancel}>
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SigInModal;
