import React, { Component } from "react";
import axios from "axios";
import Guest from './Guest';
import CreateGuest from './CreateGuest';
import Loading from './Loading';
import EditWedding from './EditWedding';
import NavigationAdmin from './NavigationAdmin';
import { getToken } from '../services/tokenService.js';

class Guestlist extends React.Component {
  state = {
    guests: []
  }

  refresh = () => {
    const token = getToken(); 
    axios
    .get(`/guests/${this.props.weddingInfo._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then(res => {
      const data = res.data;
      if (data.payload) {
        console.log(data.payload);
        this.setState({ guests: data.payload });
      }
    });
  };


  componentWillReceiveProps(nextProps) {
     if (nextProps.weddingInfo._id) {
      const token = getToken(); 
       axios
       .get(`/guests/${nextProps.weddingInfo._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
       .then(res => {
          const data = res.data;
          if (data.payload) {
            this.setState({ guests: data.payload });
          }
        });
     }
  }

  componentDidMount() {
    this.refresh(); //@mel do i still need this when im using componentWillReceiveProps?
  }

  render() {
    if (this.state.guests.length){
      return (
        <div>
          <NavigationAdmin weddingName={this.props.weddingInfo.weddingName} />
          <div className="main-content">
            <h1 className="dark">Guestlist</h1>
            <table className="table">
              <thead className="table">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th> 
                    <th>Email</th>
                    <th>RSVP</th>
                    <th>Date</th>
                    <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {this.state.guests.map( guest => <Guest key={guest._id}{...guest} />)}
              </tbody>
            </table>
          </div>
        </div>
      );  
    }
    return <Loading />
  }
}

export default Guestlist;