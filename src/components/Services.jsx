import React, { Component } from "react";

import classes from "./../style/Services.module.css";

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
          id: "1id",
          label: "first",
          isChecked: false,
        },
        {
          id: "2id",
          label: "second",
          isChecked: true,
        },
        {
          id: "3id",
          label: "third",
          isChecked: false,
        },
      ],
      selectedSortType: "default",
      searchStr: "",
      defaulSelected: true,
      currenPage: 1,
      allPages: 0,
    };
    this.checkboxChanged = this.checkboxChanged.bind(this);
    this.updateSearchStr = this.updateSearchStr.bind(this);
    this.resetFiltres = this.resetFiltres.bind(this);
    this.selectChanged = this.selectChanged.bind(this);
  }
  selectChanged(event){

    console.log(event.target.value);
    this.setState({
      selectedSortType: event.target.value,
      defaulSelected: false,
    });
    
  }
  resetFiltres(){
    this.setState({
      searchStr: "",
    });
    let newCheckboxArray = [...this.state.checkboxes];
    let index = 0;
    for (let i = 0; i < newCheckboxArray.length; i++) {
      newCheckboxArray[i].isChecked=false;
    }

    this.setState({
      checkboxes: newCheckboxArray,
    });
    this.setState({
      selectedSortType: "default",
      defaulSelected: true,
    });
  }
  updateSearchStr(event){
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
  componentDidUpdate() {
    console.log(this.state.checkboxes);
  }
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
        <div className={classes.FilterSerchBar}>
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
                <option value="name" >By Company Name</option>
              </select>
              <div className={classes.select_arrow}></div>
            </div>
          </div>
          <a href="#" className={classes.applyButton}>
            Apply
          </a>
          <a href="#" onClick={this.resetFiltres} className={classes.resetButton}>
            Reset
          </a>
        </div>
        <div className={classes.ServicePanel}></div>
        <div className={classes.Pagination}>
        <a href="#" className={classes.paginationButton}>
            Prev
          </a>
    <span>{this.state.currenPage}/{this.state.allPages}</span>
          <a href="#" className={classes.paginationButton}>
            Next
          </a>
        </div>
      </div>
    );
  }
}

export default Services;
