import React, { Component } from "react";
import classes from "./../style/ServiceCreate.module.css";
import {db, storage} from "../services/firebase"
import { auth } from "../services/firebase";
class ServiceCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productionOptions: [],
            serviceTypeSelected: "rent",
            productionDefaulTypeSelected: true,
            productionTypeSelected: "default",
            showFileInput: true,
            showUrlInput: true,
            clearOptionVisibility: "hidden",
            fileName: "",
            imgUrlInput: "",
            isUrlBad: false,
            imageFile: null,
            productName: "",
            productDescription: "",
            errorMessage: "",
            
        }
        this.serviceTypeSelected = this.serviceTypeSelected.bind(this);
        this.productionTypeSelected = this.productionTypeSelected.bind(this);
        this.onImgUrlInput = this.onImgUrlInput.bind(this);
        this.onFileInput = this.onFileInput.bind(this);
        this.clearFileInput = this.clearFileInput.bind(this);
        this.onProductNameInput = this.onProductNameInput.bind(this);
        this.onDescriptionInput = this.onDescriptionInput.bind(this);
        this.onApllyButtonClick = this.onApllyButtonClick.bind(this);
        this.checkImageUrl = this.checkImageUrl.bind(this);
        this.createService = this.createService.bind(this);
        this.uploadService = this.uploadService.bind(this);
    }
    componentDidMount(){
        const productType = [
            {
                value: "engine",
                name: "Engine"
            },
            {
                value: "filter",
                name: "Filter"
            },
            {
                value: "generator",
                name: "Generator"
            },
            {
                value: "illuminator",
                name: "Lighting Equipment"
            },
            {
                value: "hydraulic",
                name: "Hydraulic Equipment"
            },
            {
                value: "motopump",
                name: "Motor Pump"
            },
            {
                value: "grindingwheel",
                name: "Grinding Wheel"
            },
            {
                value: "coredrill",
                name: "Core Drill"
            },
        ]
        this.setState(
            {
                productionOptions: productType.map(el => {
                    return (
                    <option value={el.value} >{el.name}</option>
                    )
                })
            }
        )
    }
    async uploadService(service){
        console.log(auth().currentUser);
        try {
            await db.ref(this.state.serviceTypeSelected).push(service);
            await this.setState({
                errorMessage: "Success result"
            })
          } catch (error) {
            this.setState({ errorMessage: error.message });
            return;
          }
        
    }
    createService(){
        const d = new Date();
        let service = {
            type: this.state.productionTypeSelected,
            name: this.state.productName,
            description: this.state.productDescription,
            image: this.state.imgUrlInput,
            id: this.state.productName.replace(/\s/g,'')+d.getTime(),
        }
        
        if(this.state.imgUrlInput.length<1 && this.state.imageFile){
            
            const imageName = this.state.imageFile.name.replace(/\s/g,'')+d.getTime();
            const uploadImage = storage.ref(`serviceimages/${imageName}`).put(this.state.imageFile);
            uploadImage.on('state_changed', 
            (snapShot) => {
              console.log(snapShot)
            }, (err) => {
              console.log(err)
            }, () => {
              storage.ref('serviceimages').child(imageName).getDownloadURL()
               .then(fireBaseUrl => {
                 service.image = fireBaseUrl;
                    this.uploadService(service);
               })
            })
             
        }
        else{
            this.uploadService(service);
        }
    }
    checkImageUrl(url, good, bad) {
        let img = new Image();
        img.onload = good;
        img.onerror = bad;
        img.src = url;
    }
    onApllyButtonClick() {
        if (this.state.productName.length < 1) {
            this.setState({
                errorMessage: "Product name missed",
            });
        }
        else if(this.state.isUrlBad){
            this.setState({
                errorMessage: "Bad Photo URL",
            });
        }
        else{
            this.setState({
                errorMessage: "",
            });
            this.createService();
        }

    }
    onProductNameInput(event) {
        this.setState({
            productName: event.target.value,
        });
    }
    onDescriptionInput(event) {
        this.setState({
            productDescription: event.target.value,
        });
    }
    clearFileInput() {
        this.setState({
            imageFile: null,
            showFileInput: true,
            showUrlInput: true,
            clearOptionVisibility: "hidden",
            fileName: "",
        });
    }
    onImgUrlInput(event) {
        if (event.target.value.length == 0) {
            
            this.setState({
                imgUrlInput: "",
                showFileInput: true,
                showUrlInput: true,
                isUrlBad: false,
            });
        }
        else {
            this.checkImageUrl(event.target.value, ()=>{
                this.setState({
                    isUrlBad: false,
                });
            },
            ()=>{
                this.setState({
                    isUrlBad: true,
                });
            }
            )
            this.setState({
                imgUrlInput: event.target.value,
                showFileInput: false,
                showUrlInput: true,
            });
        }
    }
    onFileInput(event) {

        if (event.target.files[0]) {
            this.setState({
                imageFile: event.target.files[0],
                fileName: event.target.files[0].name,
                showFileInput: true,
                showUrlInput: false,
                clearOptionVisibility: "visible",
            });
        }

    }
    serviceTypeSelected(event) {
        this.setState({
            serviceTypeSelected: event.target.value,
        });
    }
    productionTypeSelected(event) {
        this.setState({
            productionTypeSelected: event.target.value,
            productionDefaulTypeSelected: false
        });
    }
    render() {
        return (
            <div className={classes.servicecreate}>
                <div className={classes.headingPart}>
                    <h2>Create Service Page</h2>
                    <p>On this page you can create new services. Pistures and details are optional, but you must select type of a service, production type and enter its name.</p>
                </div>
                <div className={classes.settingPart}>
                    <h3>Essential Settings</h3>
                    <div className={classes.select}>
                        <select onChange={this.serviceTypeSelected}>
                            <option value="rent" >Rent</option>
                            <option value="repair" >Repair</option>
                            <option value="sale" >Sale</option>
                        </select>
                        <div className={classes.select_arrow}></div>
                    </div>
                    <div className={classes.select}>
                        <select onChange={this.productionTypeSelected}>
                            <option value="default" selected={this.state.productionDefaulTypeSelected}>Default</option>
                            {this.state.productionOptions}
                        </select>
                        <div className={classes.select_arrow}></div>
                    </div>
                    <p>Set Main Image</p>
                    {
                        this.state.showUrlInput ?
                            <input type="url" className={classes.imgUrlInput} value={this.state.imgUrlInput} onChange={this.onImgUrlInput} placeholder="Image URL"></input> : null}

                    {
                        this.state.showFileInput ?
                            <div className={classes.fileInput} onClick={this.state.onFileInput}>

                                <input type="file" id="file"
                                    accept="image/png, image/jpeg" onChange={this.onFileInput}></input>
                                <label for="file" className={classes.imgFileInput}>Select Photo</label>
                                <a style={{ visibility: this.state.clearOptionVisibility }} className={classes.imgFileInputClear} onClick={this.clearFileInput}>Clear</a>

                            </div> : null}
                    <p>{this.state.fileName}</p>
                </div>
                <div className={classes.descriptionPart}>
                <h2>Service Description</h2>
                    <input type="text" className={classes.nameInput} value={this.state.productName} onChange={this.onProductNameInput} placeholder="Product name"></input>
                    <textarea className={classes.descriptionInput} name="description" placeholder="Product description" cols="30" rows="15" onChange={this.onDescriptionInput}></textarea>
                    <p>{this.state.errorMessage}</p>
                    <a className={classes.applyButton} onClick={this.onApllyButtonClick}>Apply</a>
                </div>
            </div>
        );
    }
}



export default ServiceCreate;






