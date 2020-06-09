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
      "https://lh3.googleusercontent.com/proxy/npwxMpExClHcaYEit1Kc7Ze4a5u5GJzDw1pNv2uTHAdX8mVX78mXvdZrKHf7KZxPY3GEAvlh6iKHYaD-71N32aJz5Hig1JY1cI-VMprvuIMlTwPnAUMR_A ",
      "https://img.aviationpros.com/files/base/cygnus/cavc/image/2020/05/ANDY_PRINT_1138.5eb057a1ce610.png?auto=format&fit=max&w=1200",
      "https://stroy-podskazka.ru/images/article/thumb/480-0/2018/12/osobennosti-sabelnyh-pil-po-metallu.jpg",
      "https://i.ytimg.com/vi/eEKH6cy7WJU/maxresdefault.jpg",
      "https://stroikairemont.com/wp-content/uploads/2016/09/preimushhestva-primeneniya-motopompy-2.jpg",
      "https://cdn.thefabricator.com/a/wire-brushes-grinding-wheels-and-flap-discs-oh-my--0.jpg?size=1000x",
      "https://lh3.googleusercontent.com/proxy/CeTwMGfAj3Dx5kjEE6A4EJGCpFqQjv3eFjRlUK2oKP4viY6UBiY4QhYJmNyckcN3EaO1JUuKq5Ng8_pU0X4Ce-2up8kNjCi2Ky2KxalC4XieumCUOrpv2A",
      "https://image.ec21.com/image/homelaine/oimg_GC10166384_CA10167896/Weifang-R6105-Series-Diesel-Engine-for-Water-Pump-and-Generator-Use.jpg",
      "https://e-ukrservice.com/image/catalog/data/article/discovaia-pila-rabota-bezopasnaia.jpg",
      "https://sadovij-pomoshnik.ru/wp-content/uploads/2017/12/Benzinovaya-motopompa-1.jpg",
      "https://lh3.googleusercontent.com/proxy/Z82jycERqV0KJ_l6xTpIhqaBAVTxo9UMiEC9BPpe_UOhHEJiY5jNwULY9gDhoANs0QZFhsMJJEY3DBsCsnAX6eIFjCJ2l25JR7P8XYfCX1DwtTWvgkrDNA",
    ]
    this.setState({
      images: imagesURLs.map(el=>{
        return (<img key={el} src={el} className={classes.image}  alt="" />)
      })
    });
  }
  
  render() {
    return (
      <div className={classes.Photos} onError={()=>{alert("Loading image error")}}>
        {this.state.images}
      </div>
    );
  }
}

export default Photos;
