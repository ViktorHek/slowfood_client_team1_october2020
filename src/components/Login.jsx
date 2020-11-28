import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    renderRegistrationForm: false,
  };

  async authenticate(event) {
    event.preventDefault();
    let credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.password_confirmation.value,
    };
    let response = await axios.post(
      "http://localhost:3000/api/auth",
      credentials
    );
    const userData = {
      uid: response.headers.uid,
      client: response.headers.client,
      token_type: response.headers.token_type,
      expiry: response.headers.expiry,
    };
    localStorage.setItem("credentials", JSON.stringify(userData));
    localStorage.setItem("authenticated", true);
    this.props.toggleAuthenticatedState();
    this.setState({ renderRegistrationForm: false });
  }

  render() {
    return (
      <>
        {this.state.renderRegistrationForm ? (
          <form onSubmit={(event) => this.authenticate(event)} >
            <input type="text" name="email" data-cy="email"/>
            <input type="password" name="password" data-cy="password"/>
            <input
              type="password"
              name="password_confirmation"
              data-cy="password-confirmation"
            />
            <input type="submit" value="Register" data-cy="register" />
          </form>
        ) : (
          <button
            data-cy="register-cta"
            onClick={() => this.setState({ renderRegistrationForm: true })}
          >
            Register
          </button>
        )}
      </>
    );
  }
}
export default Login;
