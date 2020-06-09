import React, { Component } from "react";
// import classes from "./../Style/Login.module.css"
// import { useHistory } from "react-router-dom";
import classes from "./../style/Home.module.css";
// import EraImg from "../pictures/eraBigImg.jpg";
import contactClasses from "./../style/Contacts.module.css";
import defaulContactImg from "./../pictures/contactDefaultImg.png";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class Contacts extends Component {
  render() {
    const style = {
      width: "70vw",
      height: "50vh",
    };
    return (
      <div className={classes.Home} onError={()=>{alert(`Loading image error`)}}>
        <div className={classes.wrapper}>
          {/* <img src={EraImg} className={classes.sliderImg} alt="" /> */}
        </div>
        <div className={classes.wrapper}>
          <h2>Contacts</h2>
        </div>
        <div className={classes.wrapper}>
          <div className={contactClasses.wrapper}>
            <div className={contactClasses.contact}>
              <div className={contactClasses.image}>
                <img src={defaulContactImg} alt="Contact Image" />
              </div>
              <div className={contactClasses.info}>
                <address>
                  <span>Інжиніринг Ремейк Агрегат </span>
                  <span>г. Киев, ул. Верхний вал</span>
                  <span>(офис/факс)</span>
                  <a href="mailto: info@e-ra.kiev.ua">info@e-ra.kiev.ua</a>
                  <a href="tel:+380445991644">+380 (44) 5991 644</a>
                  <a href="http://www.e-ra.kiev.ua">http://www.e-ra.kiev.ua</a>
                </address>
              </div>
            </div>
            <div className={contactClasses.contact}>
              <div className={contactClasses.image}>
                <img src={defaulContactImg} alt="Contact Image" />
              </div>
              <div className={contactClasses.info}>
                <address>
                  <span>Інжиніринг Ремейк Агрегат </span>
                  <span>г. Киев, ул. Верхний вал</span>
                  <span>(технические вопросы)</span>
                  <a href="mailto: info@e-ra.kiev.ua">info@e-ra.kiev.ua</a>
                  <a href="tel:+380986809510">+380 (98) 680 95 10</a>
                  <a href="http://www.e-ra.kiev.ua">http://www.e-ra.kiev.ua</a>
                </address>
              </div>
            </div>
            <div className={contactClasses.contact}>
              <div className={contactClasses.image}>
                <img src={defaulContactImg} alt="Contact Image" />
              </div>
              <div className={contactClasses.info}>
                <address>
                  <span>Інжиніринг Ремейк Агрегат </span>
                  <span>г. Киев, ул. Верхний вал</span>
                  <span>(офис)</span>
                  <a href="mailto: info@e-ra.kiev.ua">info@e-ra.kiev.ua</a>
                  <a href="tel:+380445920448"> +380 (44) 5920 448 </a>
                  <a href="http://www.e-ra.kiev.ua">http://www.e-ra.kiev.ua</a>
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.wrapper}>
          <h3>View office on map</h3>
          <div className={contactClasses.mapWrapper}>
            <Map
              google={this.props.google}
              style={style}
              zoom={14}
              initialCenter={{
                lat: 50.469057,
                lng: 30.51824,
              }}
            >
              <Marker
                title={"ERA office"}
                name={"office"}
                position={{
                  lat: 50.469057,
                  lng: 30.51824,
                }}
              />

              <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDueF7qXIxjPTJRVBtiSdF8xyNHbOCAoKU",
})(Contacts);
