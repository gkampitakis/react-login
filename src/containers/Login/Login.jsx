import React, { Component, Fragment } from 'react';
import './Login.css';
import * as validator from 'validator';
import * as _ from 'lodash';
import { Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const errorMessageStyle = {
  color: 'red',
  textAlign: 'left',
  width: '70%',
  margin: 'auto'
};

class Login extends Component {
  // constructor
  state = {
    form: {
      email: { value: '', valid: true },
      password: { value: '', visible: false }
    },
    loading: false
  };

  login = async e => {
    e.preventDefault();
    try {
      this.toggleLoading();
      await this.props.login(
        this.state.form.email.value,
        this.state.form.password.value
      );
      this.props.auth(true);
      this.props.history.push('/home');
      //FIXME:invalidate on unauthorized and throw unauthorized from server
      //FIXME: image on model
      //FIXME: code refactor more sexy react
      //FIXME: register page
    } catch (err) {
      console.error(err);
    } finally {
      this.toggleLoading();
    }
  };

  toggleLoading = () => {
    let { loading } = this.state;
    loading = !loading;
    this.setState({ ...this.state, loading });
  };

  emailOnChange = e => {
    const { form } = this.state;
    form.email.value = e.target.value;
    this.setState({ form: form });
  };

  validateEmail = _.debounce(() => {
    const { form } = this.state;

    if (form.email.value)
      form.email.valid = validator.isEmail(form.email.value) ? true : false;
    else form.email.valid = true;

    this.setState({ form: form });
  }, 1000);

  passwordOnChange = e => {
    const { form } = this.state;
    form.password.value = e.target.value;
    this.setState({ form: form });
  };

  toggleVisibility = () => {
    const { form } = this.state;
    form.password.visible = !form.password.visible;
    this.setState({ form: form });
  };

  render() {
    let loading = this.state.loading ? (
      <Spinner className="spinner" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    ) : null;

    return (
      <Fragment>
        <h1>Login Please</h1>
        <form action="">
          <input
            value={this.state.form.email.value}
            onChange={this.emailOnChange}
            onKeyUp={this.validateEmail}
            placeholder="Email"
            type="email"
          />
          {this.state.form.email.valid ? (
            <div style={{ height: '18px' }}></div>
          ) : (
            <div style={errorMessageStyle}>Invalid Email</div>
          )}
          {this.state.form.password.visible ? (
            <FaEye className="toggleIcon" onClick={this.toggleVisibility} />
          ) : (
            <FaEyeSlash
              className="toggleIcon"
              onClick={this.toggleVisibility}
            />
          )}
          <input
            value={this.state.form.password.value}
            onChange={this.passwordOnChange}
            placeholder="Password"
            type={this.state.form.password.visible ? 'text' : 'password'}
          />
          <button
            disabled={
              !(
                this.state.form.email.valid &&
                !_.isEmpty(this.state.form.password.value) &&
                !_.isEmpty(this.state.form.email.value)
              )
            }
            className="submit"
            type="submit"
            onClick={this.login}
          >
            Login
          </button>
        </form>
        {loading}
      </Fragment>
    );
  }
}

export default withRouter(Login);
