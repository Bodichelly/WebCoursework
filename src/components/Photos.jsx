import React, { Component } from "react";
import classes from "./../style/Photos.module.css";


class Photos extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
    };
    
  }

  componentDidMount(){
    const imagesURLs = [
      "https://www.hatz-diesel.com/fileadmin/user_upload/hatz-diesel.com/bauma_underneath/2019/service-content.jpg",
      "https://lh3.googleusercontent.com/proxy/PpVyvKly5pa4P9m3MoAJWdcDi7W9bvkTm-H3Or8eFDDCVP62YR8dNmFfir-bDO8lXCXk2PjuxUxy2sTAm4Zqmp1AyCNmmVqBctdcCEV-pd7-CkteLBwGkwzwau9A_GHwIw6m9a3IgXqlRcli8tsc",
      "https://img.aviationpros.com/files/base/cygnus/cavc/image/2020/05/ANDY_PRINT_1138.5eb057a1ce610.png?auto=format&fit=max&w=1200",
      "https://stroy-podskazka.ru/images/article/thumb/480-0/2018/12/osobennosti-sabelnyh-pil-po-metallu.jpg",
      "https://i.ytimg.com/vi/eEKH6cy7WJU/maxresdefault.jpg",
      "https://stroikairemont.com/wp-content/uploads/2016/09/preimushhestva-primeneniya-motopompy-2.jpg",
      "https://cdn.thefabricator.com/a/wire-brushes-grinding-wheels-and-flap-discs-oh-my--0.jpg?size=1000x",
      "https://lh3.googleusercontent.com/proxy/glO907UzKYAwwR96jHQWQ70nRrA4EeVxRq2hnuJiZh6PM_5mt5NyLHGPIlDIH6_GPVWwx3iIHj6_QvImQQTeTtMUIov1a8CPz7NLSg6OWb1l-RIyR7PVN4sWIaOXY_sPj-JUSGDhqAE3GHQ7RLFfsQXaKQ",
      "https://image.ec21.com/image/homelaine/oimg_GC10166384_CA10167896/Weifang-R6105-Series-Diesel-Engine-for-Water-Pump-and-Generator-Use.jpg",
      "https://e-ukrservice.com/image/catalog/data/article/discovaia-pila-rabota-bezopasnaia.jpg",
      "https://sadovij-pomoshnik.ru/wp-content/uploads/2017/12/Benzinovaya-motopompa-1.jpg",
      "https://lh3.googleusercontent.com/proxy/lwhKiYbcVpfx2awZvdhnktBxfClzRqh5Jy4wyKaV6xMbb8BZiOpXswGDeJVDhuQAmNeSJtzyMXXxG9PCR5ls55n6xpRVgK_0kNa0nq0nl6zjyxgsswoix0aUP9ZNCBdXjA",
    ]
    this.setState({
      images: imagesURLs.map(el=>{
        return (<img src={el} className={classes.image} alt="" />)
      })
    });
  }
  
  render() {
    return (
      <div className={classes.Photos}>
        {this.state.images}
      </div>
    );
  }
}

export default Photos;
