import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

/**
 * Component to Handle Page not found
 */
export default class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="background-div">
          <NavigationBar />
          <div className="background-container">
            <div className="background-container-form">
              <h1> <center>  404!  Oops! Page Not Found </center> </h1>
              <h3> <center>  You can go back home by clicking <a href="/login">  here </a> though </center> </h3>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
