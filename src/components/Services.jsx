import React, { Component } from "react";
import { db } from "../services/firebase"
import classes from "./../style/Services.module.css";
import serviceImg from "../pictures/serviceDefaultImg.png"
import ServiceModal from "./ServiceModal"
import Loader from "./Loader"

function CheckBox({ el, onChange }) {
  return (
    <label key={el.id} className={classes.bcontain}>
      <span>{el.label}</span>
      <input
        type="checkbox"
        checked={el.isChecked}
        onChange={() => onChange(el.id)}
        id={el.id}
      />
      <div className={classes.binput}></div>
    </label>
  );
}

function CheckBoxesList(props) {
  return (
    <div>
      {props.checkboxes.map((el) => {
        return (
          <CheckBox el={el} key={el.id} onChange={props.checkboxChanged} />
        );
      })}
    </div>
  );
}

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: [
        {
          isChecked: false,
          id: "engine",
          label: "Engine"
        },
        {

          isChecked: false,
          id: "filter",
          label: "Filter"
        },
        {

          isChecked: false,
          id: "generator",
          label: "Generator"
        },
        {

          isChecked: false,
          id: "illuminator",
          label: "Lighting Equipment"
        },
        {

          isChecked: false,
          id: "hydraulic",
          label: "Hydraulic Equipment"
        },
        {

          isChecked: false,
          id: "motopump",
          label: "Motor Pump"
        },
        {

          isChecked: false,
          id: "grindingwheel",
          label: "Grinding Wheel"
        },
        {

          isChecked: false,
          id: "coredrill",
          label: "Core Drill"
        },
      ],
      selectedSortType: "default",
      searchStr: "",
      defaulSelected: true,
      showServiceModal: false,
      showLoader: false,
      currenPage: 1,
      allPages: 0,
      selectedServiceName:"",
      selectedServiceDescription: "",
      servicesHtml: [],
      services: [],

      servicesType: this.props.servicesType,
      message: "",
    };
    this.checkboxChanged = this.checkboxChanged.bind(this);
    this.updateSearchStr = this.updateSearchStr.bind(this);
    this.resetFiltres = this.resetFiltres.bind(this);
    this.selectChanged = this.selectChanged.bind(this);
    this.getServices = this.getServices.bind(this);
    this.setServicesHtml = this.setServicesHtml.bind(this);
    this.serviceClick = this.serviceClick.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setLoaderStatus = this.setLoaderStatus.bind(this);
    this.close = this.close.bind(this);
  }
  setLoaderStatus(shouldBeDisplayed){
    this.setState({
      showLoader: shouldBeDisplayed,
    })
  }
  close(){
    this.setState({
      showServiceModal: false,
    })
  }
  // Math.ceil(services.length/5)
  changePage(event) {
    if (event.target.id === "next") {
      console.log("next");
      if (this.state.currenPage < this.state.allPages) {
        this.setState({
          currenPage: this.state.currenPage +1,
        }, ()=>{ 
          this.setState({
            servicesHtml: this.setServicesHtml(this.state.services),
          });
        })
      }
    } else {
      console.log("prev");
      if (this.state.currenPage > 1) {
        this.setState({
          currenPage: this.state.currenPage -1,
        }, ()=>{ 
          this.setState({
            servicesHtml: this.setServicesHtml(this.state.services),
          });
        })
      }
    }
  }
  applyChanges() {
    this.setState({
      currenPage: 1,
    },
    ()=> {this.getServices();}
    )
    
  }
  serviceClick(id) {
    let service = this.state.services.find( el => el.id===id);
    this.setState({
      selectedServiceName: service.name,
      selectedServiceDescription: service.description,
      showServiceModal: true
    });
  }
  dynamicSort(property) {
    if (property == "default") {
      return (a, b) => { return 0; }
    }
    return function (a, b) {
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result;
    }
  }
  setServicesHtml(services) {
    if(services.length<1){
      this.setState({
        message: "Services could not be found",
      })
    }
    return services.slice((this.state.currenPage - 1) * 5, 5 + (this.state.currenPage - 1) * 5).sort(this.dynamicSort(this.state.selectedSortType)).map((el) => {
      return (
        <div key={el.id} className={classes.serviceContainer} onClick={() => { this.serviceClick(el.id) }}>
          {el.image.length > 0 ? <img src={el.image} className={classes.serviceImage} alt="" /> :
            <img src={serviceImg} className={classes.serviceImage} alt="" />
          }
          <p className={classes.serviceName}>{el.name}</p>
        </div>
      )
    })

  }
  async getServices() {
    this.setLoaderStatus(true);
    console.log(this.props.servicesType);
    try {
      db.ref("/" + this.props.servicesType).on("value", snapshot => {
        let services_ = [];
        if (!snapshot.val()) {
          this.props.setLoaderStatus(false);
          return;
        }
        Object.values(snapshot.val()).forEach((snap) => {
          const selectedFilters = this.state.checkboxes.filter(el => el.isChecked === true).map(el => {
            return el.id;
          });
          if (selectedFilters.length > 0) {

            if (selectedFilters.includes(snap.type)) {
              const reg = new RegExp(this.state.searchStr.replace(/\s/g, '|'), 'i');
              if (reg.test(snap.name)) {
                services_.push(snap);
              } else if (reg.test(snap.description)) {
                services_.push(snap);
              }
            }
          } else {
            const reg = new RegExp(this.state.searchStr.replace(/\s/g, '|'), 'i');
            
            if (reg.test(snap.name)) {
              services_.push(snap);
            } else if (reg.test(snap.description)) {
              services_.push(snap);
            }
          }


        });
        console.log(services_);
        this.setState({
          services: services_,
          servicesHtml: this.setServicesHtml(services_),
          allPages: Math.ceil(services_.length / 5),
        },()=>{
          this.setLoaderStatus(false);
        });
      });

    } catch (error) {
      this.setState({ message: error.message });
      this.setLoaderStatus(false);
    }
  }
  componentDidMount() {
    this.getServices();
  }
  selectChanged(event) {

    console.log(event.target.value);
    this.setState({
      selectedSortType: event.target.value,
      defaulSelected: false,
    });

  }
  resetFiltres() {
    this.setState({
      searchStr: "",
    });
    let newCheckboxArray = [...this.state.checkboxes];
    let index = 0;
    for (let i = 0; i < newCheckboxArray.length; i++) {
      newCheckboxArray[i].isChecked = false;
    }

    this.setState({
      checkboxes: newCheckboxArray,
    });
    this.setState({
      selectedSortType: "default",
      defaulSelected: true,
    });
  }
  updateSearchStr(event) {
    this.setState({
      searchStr: event.target.value,
    });
  }
  checkboxChanged(_id) {
    // const _id = event.target.id;
    // const tmpId = this.id;
    // if (_id == tmpId) {
    //   return;
    // }
    // console.log(_id);
    let newCheckboxArray = [...this.state.checkboxes];
    let index = 0;
    for (let i = 0; i < newCheckboxArray.length; i++) {
      if (newCheckboxArray[i].id == _id) {
        index = i;
        break;
      }
    }
    newCheckboxArray[index] = {
      ...newCheckboxArray[index],
      isChecked: !newCheckboxArray[index].isChecked,
    };

    this.setState({
      checkboxes: newCheckboxArray,
    });
  }
  // componentWillUnmount(){
  //   this.props.setLoaderStatus(false);
  // }
  // componentDidMount() {
  //   this.setState((prevState) => ({
  //     checkboxesHTML: prevState.checkboxes.map((el) => {
  //       return (
  //         <label key={el.id} className={classes.bcontain}>
  //           <span>{el.label}</span>
  //           <input type="checkbox" checked={el.isChecked} id={el.id} />
  //           <div className={classes.binput}></div>
  //         </label>
  //       );
  //     }),
  //   }));
  // }
  render() {
    return (
      <div className={classes.Services}>
        { this.state.showLoader ? <Loader /> : null}
        {this.state.showServiceModal ? <ServiceModal close={this.close} name={this.state.selectedServiceName}  description={this.state.selectedServiceDescription}  /> : null}
        <div className={classes.FilterSerchBar}>
          <h2>{this.state.servicesType}</h2>
          <div className={classes.SearchBar}>
            <label htmlFor="searchStr">Search</label>
            <input
              className={classes.searchInput}
              type="text"
              id="searchStr"
              name="searchStr"
              placeholder="Search..."
              value={this.state.searchStr}
              onChange={this.updateSearchStr}
            />
          </div>
          <div className={classes.FilterBar}>
            <CheckBoxesList
              checkboxes={this.state.checkboxes}
              checkboxChanged={this.checkboxChanged}
            />
          </div>
          <div className={classes.SortBar}>
            <div className={classes.select}>
              <select onChange={this.selectChanged}>
                <option value="default" selected={this.state.defaulSelected}>Default</option>
                <option value="type" >By Type</option>
                <option value="name" >By Name</option>
              </select>
              <div className={classes.select_arrow}></div>
            </div>
          </div>
          <a className={classes.applyButton} onClick={this.applyChanges}>
            Apply
          </a>
          <a onClick={this.resetFiltres} className={classes.resetButton}>
            Reset
          </a>
        </div>
        <div className={classes.ServicePanel} onError={()=>{alert(`Loading image error`)}}>
          {this.state.servicesHtml.length > 0 ? this.state.servicesHtml : this.state.message}
        </div>
        <div className={classes.Pagination} onClick={this.changePage}>
          <a id="prev" className={classes.paginationButton}>
            Prev
          </a>
          <span>{this.state.currenPage}/{this.state.allPages}</span>
          <a id="next" className={classes.paginationButton}>
            Next
          </a>
        </div>
      </div>
    );
  }
}

export default Services;
