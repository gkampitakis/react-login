import React, { Component, Fragment } from 'react';
import './Login.css';
import * as validator from 'validator';
import * as _ from 'lodash';

const errorMessageStyle = {
  color: 'red',
  textAlign: 'left',
  width: '70%',
  margin: 'auto'
};

export default class Login extends Component {
  // constructor
  state = {
    form: {
      email: { value: '', valid: true },
      password: { value: '' }
    }
  };

  login = e => {
    e.preventDefault();
    // this.props.login();
  };

  emailOnChange = e => {
    e.persist();
    _.debounce(
      () => {
        console.log(e.target.value);
      },
      500,
      {
        // leading: true,
        // trailing: true
      }
    )();

    // const { form } = this.state;
    // form.email.valid = true;
    // if (!validator.isEmail(e.target.value)) form.email.valid = false;
    // form.email.value = e.target.value;

    // this.setState({ form: form });
  };

  passwordOnChange = e => {
    // const { form } = this.state;
  };

  validForm =
    this.state.form.email.value &&
    this.state.form.password.value &&
    this.state.form.email.valid;

  render() {
    return (
      <Fragment>
        <h1>Login Please</h1>
        <form action="">
          <input
            value={this.state.form.email.value}
            onChange={this.emailOnChange}
            placeholder="Email"
            type="email"
          />
          {this.state.form.email.valid ? null : (
            <div style={errorMessageStyle}>Invalid Email</div>
          )}
          <input
            value={this.state.form.password.value}
            onChange={this.passwordOnChange}
            placeholder="Password"
            type="password"
          />
          <button
            disabled={!this.validForm}
            className="submit"
            type="submit"
            onClick={this.login}
          >
            Login
          </button>
        </form>
      </Fragment>
    );
  }
}
