import React, { Component } from "react";
// import classes from "./../Style/Login.module.css"
// import { useHistory } from "react-router-dom";
import classes from "./../style/Home.module.css";
import aboutClasses from "./../style/About.module.css";
import EraImg from "../pictures/eraBigImg.jpg";
import HatzDiesellogo from "../pictures/HatzDiesellogo.jpg";
import olisava from "../pictures/olisava.gif";

class About extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }
  render() {
    return (
      <div className={classes.Home} onError={()=>{alert(`Loading image error`)}}>
        <div className={classes.wrapper}></div>
        <div className={classes.wrapper}>
          <h2>About page</h2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
          consectetur quisquam minus, ex reprehenderit expedita vel nobis
          consequuntur voluptatibus provident, nulla fugiat ipsum at quasi
          inventore commodi omnis. Temporibus, harum?
        </div>
        <div className={classes.wrapper}>
          <div className={aboutClasses.wrapper}>
            <div className={aboutClasses.card}>
              <div className={aboutClasses.front}>
                <img src={EraImg} alt="Era" />
              </div>
              <div className={aboutClasses.back}>
                <span>
                  Воплощая корпоративную философию индивидуального подхода к
                  нуждам своих потребителей, компания Инжиниринг Ремейк Агрегат
                  выпускает разнообразное технологическое оборудование под
                  маркой ERA. Оригинальные технические решения, нестандартные
                  требования потребителей, огромный опыт и признанный авторитет
                  партнёров позволяет создавать на основе базовых агрегатов
                  европейских производителей оборудование под конкретного
                  заказчика.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={aboutClasses.wrapper}>
            <div className={aboutClasses.card}>
              <div className={aboutClasses.front}>
                <img src={HatzDiesellogo} alt="HATZ" />
              </div>
              <div className={aboutClasses.back}>
                <span>
                  Фирма MOTORENFABRIK HATZ была основана в 1880 году Матиасом
                  Хатцем в городке Рушторф, расположенном в Баварии, Германия.
                  Сейчас площадь производственных помещений достигла 50000 кв.
                  м. Более 1000 квалифицированных сотрудников предприятия
                  производят в год более 60000 единиц дизельных двигателей
                  мощностью от 3 до 60 кВт, а также 2,5 миллиона компонентов для
                  автомобильной промышленности. Все дизельные двигатели Hatz
                  производятся в Германии. Двигатели Натz отличаются низким
                  расходом топлива, длительным сроком службы, низким уровнем
                  вибраций и небольшими затратами на обслуживание. Поэтому они
                  часто используются в составе различных агрегатов. Они могут
                  работать только на дизельном топливе. Некоторые модели
                  снабжены шумоизолирующим кожухом и электрическим стартером.{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={aboutClasses.wrapper}>
            <div className={aboutClasses.card}>
              <div className={aboutClasses.front}>
                <img src={olisava} alt="Olisava" />
              </div>
              <div className={aboutClasses.back}>
                <span>
                  В основе торговой марки Olisava большой опыт Инжиниринг Ремейк
                  Агрегат по применению алмазного инструмента на различном
                  оборудовании и по различному материалу в Украине.
                  Долговременное и плодотворное сотрудничество с ведущими
                  мировыми производителями алмазных сегментов, корпусов дисков и
                  корпусов коронок позволило Инжиниринг Ремейк Агрегат
                  предлагать широкий спектр алмазного инструмента Olisava,
                  обеспечивать полный сервис, техническую и консультационную
                  поддержку нашим клиентам.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
