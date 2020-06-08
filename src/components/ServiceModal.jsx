import React, { Component } from "react";
import classes from "./../style/ServiceModal.module.css";

class SigInModal extends Component {
  render() {
    return (
      <div className={classes.modalContainer}>
        <div className={classes.modalBox}>
          <h2>
              {this.props.name}
          </h2>
          <article>
            {this.props.description}
          </article>
          <a className={classes.closeButton} onClick={this.props.close}>
                Close
              </a>
        </div>
      </div>
    );
  }
}

export default SigInModal;
