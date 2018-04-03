import React, { Component } from "react";
import axios from "axios";
import ReactFilestack from 'filestack-react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Story from './Story';
import Rsvp from './Rsvp';
import WhenWhere from './WhenWhere';
import Registry from './Registry';
import Admin from './Admin';

class OurWedding extends React.Component {
      state = {
      weddingInfo: {}
    }

  refresh = () => {
    // get all weddings from the backend 
    axios.get(`/weddings/${this.props.match.params.weddingName}`).then(res => {
      const data = res.data;
      // if blog guests come back
      if (data.payload) {
        //debugger;
        // store them in state
        console.log(data.payload);
        this.setState({ weddingInfo: data.payload });
      }
    });
  };

    componentDidMount() {
      this.refresh();
    }
  render() {
    return (
        <Router>
        <div>
        <Switch>
          <Route exact path='/:weddingName/' render={() => <Story weddingInfo={this.state.weddingInfo}/>} />
          <Route path='/:weddingName/whenwhere' render={() => <WhenWhere weddingInfo={this.state.weddingInfo}/>} />
          <Route path='/:weddingName/registry' render={() => <Registry weddingInfo={this.state.weddingInfo}/>} />
          <Route path='/:weddingName/rsvp' render={() => <Rsvp weddingInfo={this.state.weddingInfo}/>} />
          <Route path='/:weddingName/admin' component={Admin} />
          </Switch>
          </div>
        </Router>
    );
  }
}

export default OurWedding;