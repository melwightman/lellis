// components/CreateWedding
import React from "react";
import axios from "axios";
import moment from "moment";

import UploadPic from './UploadPic';

class CreateWedding extends React.Component {
  state = {
    weddingName: "",
    partnerFirstNameA: "",
    partnerLastNameA: "",
    partnerFirstNameB: "",
    partnerLastNameB: "",
    date: "",
    startTime: "", 
    endTime: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    storyPic: "",
    whenWherePic: "",
    registryPic: "",
    rsvpPic: ""
  };

  onUploadSuccess = (success, picName) => {
      const url = success.filesUploaded[0].url;
      this.setState({
          [picName]: url,
      });
    
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { weddingName, partnerFirstNameA, partnerLastNameA, partnerFirstNameB, partnerLastNameB, date, startTime, endTime, addressLine1, addressLine2, addressLine3, storyPic, whenWherePic, registryPic, rsvpPic  } = this.state;
    //const convertedHour = moment(startTime);
    debugger;
    //startTime.split(":") this will return an array of two elements
    //create copy of date. set hour set minutes
    var eventDate = new Date(date);
    var startDate = new Date(eventDate.getTime());

    const startTimeSplit = startTime.split(":");
    const startHour = parseInt(startTimeSplit[0]);
    const startMinutes = parseInt(startTimeSplit[1]);

    startDate.setHours(startHour);
    startDate.setMinutes(startMinutes);

    var endDate = new Date(eventDate.getTime());
    const endTimeSplit = endTime.split(":");
    const endHour = parseInt(endTimeSplit[0]);
    const endMinutes = parseInt(endTimeSplit[1]);

    endDate.setHours(endHour);
    endDate.setMinutes(endMinutes);    

    //console.log(endTime);
    axios
      .post("/weddings", {
        weddingName,
        partnerFirstNameA,
        partnerLastNameA,
        partnerFirstNameB,
        partnerLastNameB,
        startDate, 
        endDate,
        addressLine1,
        addressLine2,
        addressLine3,
        storyPic,
        whenWherePic,
        registryPic,
        rsvpPic 
      })
      .then(this.props.refresh);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <UploadPic onUploadSuccess={this.onUploadSuccess} buttonText = "Our Story Picture" picName="storyPic"/>
        <UploadPic onUploadSuccess={this.onUploadSuccess} buttonText = "When & Where Picture" picName="whenWherePic"/>
        <UploadPic onUploadSuccess={this.onUploadSuccess} buttonText = "Registry Picture" picName="registryPic"/>
        <UploadPic onUploadSuccess={this.onUploadSuccess} buttonText = "RSVP Picture" picName="rsvpPic"/>
        <h2>Create a New Wedding</h2>
        <div>
          <input
            onChange={this.handleChange}
            name="weddingName"
            type="text"
            placeholder="weddingName"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="partnerFirstNameA"
            type="text"
            placeholder="partnerFirstNameA"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="partnerLastNameA"
            type="text"
            placeholder="partnerLastNameA"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="partnerFirstNameB"
            type="text"
            placeholder="partnerFirstNameB"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="partnerLastNameB"
            type="text"
            placeholder="partnerLastNameB"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="date"
            type="date"
            placeholder="date"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="startTime"
            type="time"
            placeholder="startTime"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="endTime"
            type="time"
            placeholder="endTime"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="addressLine1"
            type="text"
            placeholder="addressLine1"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="addressLine2"
            type="text"
            placeholder="addressLine2"
          />
        </div>
        <div>
          <input
            onChange={this.handleChange}
            name="addressLine3"
            type="text"
            placeholder="addressLine3"
          />
        </div>
        
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateWedding;