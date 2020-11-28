import React, { Component } from "react";
import Home from "./Home";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import DisplayProductData from "./components/DisplayProductData";
// import axios from "axios";


class App extends Component {
  state = {
    authenticated: false,
  };

  toggleAuthenticatedState() {
    this.setState({ authenticated: !this.state.authenticated });
  }

  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
        <br/>
        <Login
          toggleAuthenticatedState={() => this.toggleAuthenticatedState()}
        />
        <br/>
        <br/>
        <DisplayProductData />

        <Footer />
      </>
    );
  }
}
export default App;
