// components/CreateWedding
import React from "react";
import axios from "axios";
import moment from "moment";
import { getToken } from '../services/tokenService.js'

import UploadPic from './UploadPic';
import NavigationAdmin from './NavigationAdmin';
import Loading from './Loading';

class EditWedding extends React.Component {
  state = {
    weddingName: "",
    partnerFirstNameA: "",
    partnerLastNameA: "",
    partnerFirstNameB: "",
    partnerLastNameB: "",
    date: "",
    startTime: "", 
    endTime: "",
    rsvpDeadline: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    storyPic: "",
    whenWherePic: "",
    registryPic: "",
    rsvpPic: ""
  };

refresh = (weddingInfo) => {
      var { weddingName, partnerFirstNameA, partnerLastNameA, partnerFirstNameB, partnerLastNameB, startDate, endDate, rsvpDeadline, addressLine1, addressLine2, addressLine3, storyPic, whenWherePic, registryPic, rsvpPic } = weddingInfo;
      var date = moment(startDate).format('YYYY-MM-DD');
      var startTime = moment(startDate).format('HH:mm');
      var endTime = moment(endDate).format('HH:mm');
      var rsvpDeadline = moment(rsvpDeadline).format('YYYY-MM-DD');
      this.setState({     
        weddingName: weddingName,
        partnerFirstNameA: partnerFirstNameA,
        partnerLastNameA: partnerLastNameA,
        partnerFirstNameB: partnerFirstNameB,
        partnerLastNameB: partnerLastNameB,
        date: date, 
        startTime: startTime, 
        endTime: endTime, 
        rsvpDeadline: rsvpDeadline,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        addressLine3: addressLine3,
        storyPic: storyPic, 
        whenWherePic: whenWherePic, 
        registryPic: registryPic, 
        rsvpPic: rsvpPic 
      });
};

  componentDidMount(){
    if (this.props.weddingInfo._id) {
      this.refresh(this.props.weddingInfo);
    }    
  }
  

  componentWillReceiveProps(nextProps) {
    if (nextProps.weddingInfo._id) {
      this.refresh(nextProps.weddingInfo);   
    }
  }

  onUploadSuccess = (success, picName) => {
      const url = success.filesUploaded[0].url; //adding comment so I can commit again
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
    const { weddingName, partnerFirstNameA, partnerLastNameA, partnerFirstNameB, partnerLastNameB, date, startTime, endTime, rsvpDeadline, addressLine1, addressLine2, addressLine3, storyPic, whenWherePic, registryPic, rsvpPic  } = this.state;
    const token = getToken(); 
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
      .put(`/weddings/${this.props.weddingInfo._id}`, {
        weddingName,
        partnerFirstNameA,
        partnerLastNameA,
        partnerFirstNameB,
        partnerLastNameB,
        startDate, 
        endDate,
        rsvpDeadline,
        addressLine1,
        addressLine2,
        addressLine3,
        storyPic,
        whenWherePic,
        registryPic,
        rsvpPic 
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(this.props.refresh);
  };

  render() {
    const weddingName = this.state.weddingName;
    if (weddingName){
      return (
        <div>
          <NavigationAdmin weddingName={weddingName} />
          <form onSubmit={this.handleSubmit}> 
            <h2>Edit Wedding Details</h2>
           <div>
              <input
                onChange={this.handleChange}
                value={weddingName}
                name="weddingName"
                type="text"
                placeholder="weddingName"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="partnerFirstNameA"
                value={this.state.partnerFirstNameA}
                type="text"
                placeholder="partnerFirstNameA"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="partnerLastNameA"
                value={this.state.partnerLastNameA}
                type="text"
                placeholder="partnerLastNameA"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="partnerFirstNameB"
                value={this.state.partnerFirstNameB}
                type="text"
                placeholder="partnerFirstNameB"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="partnerLastNameB"
                value={this.state.partnerLastNameB}
                type="text"
                placeholder="partnerLastNameB"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="date"
                value={this.state.date}
                type="date"
                placeholder="date"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="startTime"
                value={this.state.startTime}
                type="time"
                placeholder="startTime"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="endTime"
                value={this.state.endTime}
                type="time"
                placeholder="endTime"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="rsvpDeadline"
                value={this.state.rsvpDeadline}
                type="date"
                placeholder="rsvpDeadline"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="addressLine1"
                value={this.state.addressLine1}
                type="text"
                placeholder="addressLine1"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="addressLine2"
                value={this.state.addressLine2}
                type="text"
                placeholder="addressLine2"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                name="addressLine3"
                value={this.state.addressLine3}
                type="text"
                placeholder="addressLine3"
              />
            </div>
            <UploadPic onUploadSuccess={this.onUploadSuccess} buttonText = "Our Story Picture" picName="storyPic"/>
            <UploadPic onUploadSuccess={this.onUploadSuccess} buttonText = "When & Where Picture" picName="whenWherePic"/>
            <UploadPic onUploadSuccess={this.onUploadSuccess} buttonText = "Registry Picture" picName="registryPic"/>
            <UploadPic onUploadSuccess={this.onUploadSuccess} buttonText = "RSVP Picture" picName="rsvpPic"/>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
    return <Loading />
  }
}

export default EditWedding;