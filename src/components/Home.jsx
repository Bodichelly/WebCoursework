import React, { Component } from "react";
// import classes from "./../Style/Login.module.css"
// import { useHistory } from "react-router-dom";
import classes from "./../style/Home.module.css";

import serviceImg from "../pictures/crescentwrench.png";
import blocksImg from "../pictures/blocksImg.png";
import bucketImg from "../pictures/bucketImg.png";

// import sliderOne from "../pictures/slider1.jpg"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderPhotosLinks: [
        "./publicPictures/slider1.jpg",
        "./publicPictures/slider2.jpg",
        // "./publicPictures/slider3.jpg",
        "./publicPictures/slider4.jpg",
        "./publicPictures/slider5.jpg",
        // "https://cdn.pixabay.com/photo/2016/02/23/16/21/mountain-1218040_960_720.jpg",
        // "https://cdn.pixabay.com/photo/2015/06/30/00/19/mountain-826114_960_720.jpg",
        // "https://www.itl.cat/pics/b/28/282933_ultra-wide-wallpaper.jpg",
      ],
      curentSlideImg: "./publicPictures/slider1.jpg",
      curentSlide: 0,
      
    };

    this.prevClicked = this.prevClicked.bind(this);
    this.nextClicked = this.nextClicked.bind(this);
  }

  componentDidMount() {
  }
  
  prevClicked(){
    let i = this.state.curentSlide;
    i--;
    if(i<0){
      i=this.state.sliderPhotosLinks.length-1;
    }
    
    this.setState({
      curentSlide: i,
      curentSlideImg: this.state.sliderPhotosLinks[i]
    })
  }
  nextClicked(){
    let i = this.state.curentSlide;
    i++;
    if(i>this.state.sliderPhotosLinks.length-1){
      i=0;
    }
    this.setState({
      curentSlide: i,
      curentSlideImg: this.state.sliderPhotosLinks[i]
    })
  }

  render() {
    return (
      <div className={classes.Home}>
        <div className={classes.wrapper}>
          
          <div className={classes.sliderElement}>
          <img
            src={this.state.curentSlideImg}
            className={classes.sliderImg}
            alt=""
          />
          <div  className={classes.prev} onClick={this.prevClicked}>&#10094;</div>
          <div  className={classes.next} onClick={this.nextClicked}>&#10095;</div>
        </div>
        </div>
        <div className={classes.wrapper}>
          <h2>Engineering Remake Aggregates</h2>
          <h3>Our advantages</h3>
          <article>
            Our company offers equipment of the highest quality. We sell, as
            well as perform the warranty and post-warranty service of German
            HATZ engines.
          </article>
        </div>
        <div className={classes.wrapper}>
          <h3>Engineering Remake Aggregates</h3>
          <ul>
            <li>
              Authorised and certificated diesel engine centre of the German
              company HATZ
            </li>
            <li>
              Distributor of the German company WEKA, producing drill engines
              and wall saws
            </li>
            <li>DOA company distributor</li>
          </ul>
        </div>
        <div className={classes.wrapper}>
          <h3>Company Type</h3>
          <div className={classes.servicesWraper}>
            <div className={classes.service}>
              <img src={serviceImg} className={classes.img} alt="" />
              <span>Services&emsp;&emsp;</span>
            </div>
            <div className={classes.service}>
              <img src={blocksImg} className={classes.img} alt="" />
              <span>Distributor</span>
            </div>
            <div className={classes.service}>
              <img src={bucketImg} className={classes.img} alt="" />
              <span>Retailer&emsp;&emsp;</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
