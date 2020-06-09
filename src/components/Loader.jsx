import React, { Component } from 'react';
import classes from "../style/MainWindow.module.css"

class Loader extends Component {

    render() {
        return (
            <div className={classes.cssloadContainer}>
                <div className={classes.cssloadWhirlpool}></div>
            </div>
        );
    }

}

export default Loader;
