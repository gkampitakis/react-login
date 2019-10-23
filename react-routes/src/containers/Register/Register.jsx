import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './Register.css';
import * as validator from 'validator';
import * as _ from 'lodash';

class Register extends Component {
  state = {
    form: {
      email: { value: '', valid: true },
      password: { value: '', valid: true },
      passwordVerify: { value: '', valid: true },
      name: { value: '' },
      image: { value: '' }
    },
    error: {
      message: ''
    },
    loading: false
  };

  setError = message => {
    let { error } = this.state;
    error.message = message;
    this.setState({ ...this.state, error });

    setTimeout(() => {
      error.message = '';
      this.setState({ ...this.state, error });
    }, 4000);
  };

  createAccount = async e => {
    e.preventDefault();

    if (
      !this.state.form.email.value ||
      !this.state.form.name.value ||
      this.state.form.password.value !== this.state.form.passwordVerify.value
    )
      return;

    this.toggleLoading();
    try {
      await this.props.createAccount(
        this.state.form.name.value,
        this.state.form.email.value,
        this.state.form.image.value,
        this.state.form.password.value
      );
      this.toggleLoading();
      this.props.history.push('/login');
    } catch (err) {
      this.setError(err.response.data);
      this.toggleLoading();
    }
  };

  emailOnChange = e => {
    const { form } = this.state;
    form.email.value = e.target.value;
    this.setState({ form: form });
  };

  nameOnChange = e => {
    const { form } = this.state;
    form.name.value = e.target.value;
    this.setState({ form: form });
  };

  passwordOnChange = e => {
    const { form } = this.state;
    form.password.value = e.target.value;
    this.setState({ form: form });
  };

  passwordVerifyOnChange = e => {
    const { form } = this.state;
    form.passwordVerify.value = e.target.value;
    this.setState({ form: form });
  };

  imageOnChange = e => {
    const { form } = this.state;
    form.image.value = e.target.value;
    this.setState({ form: form });
  };

  validateEmail = _.debounce(() => {
    const { form } = this.state;

    if (form.email.value)
      form.email.valid = validator.isEmail(form.email.value) ? true : false;
    else form.email.valid = true;

    this.setState({ form: form });
  }, 100);

  validatePassword = _.debounce(() => {
    const { form } = this.state;

    if (form.password.value) {
      form.passwordVerify.valid = form.password.valid =
        form.password.value === form.passwordVerify.value ? true : false;
    } else {
      form.password.valid = true;
      form.passwordVerify.valid = true;
    }

    this.setState({ form: form });
  }, 100);

  toggleLoading = () => {
    let { loading } = this.state;
    loading = !loading;
    this.setState({ ...this.state, loading });
  };

  render() {
    const loading = this.state.loading ? (
      <Spinner className="spinner" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    ) : null;

    return (
      <React.Fragment>
        <h1>New account</h1>
        <form>
          <input
            type="text"
            onChange={this.nameOnChange}
            value={this.state.form.name.value}
            placeholder="Name"
            required
          />
          <input
            type="text"
            value={this.state.form.email.value}
            onChange={this.emailOnChange}
            placeholder="Email"
            onKeyUp={this.validateEmail}
            style={this.state.form.email.valid ? null : { color: 'red' }}
            required
          />
          <input
            type="text"
            onChange={this.imageOnChange}
            value={this.state.form.image.value}
            placeholder="Image"
          />
          <input
            type="password"
            onChange={this.passwordOnChange}
            value={this.state.form.password.value}
            style={this.state.form.password.valid ? null : { color: 'red' }}
            placeholder="Password"
            required
          />
          <input
            type="password"
            onChange={this.passwordVerifyOnChange}
            value={this.state.form.passwordVerify.value}
            style={
              this.state.form.passwordVerify.valid ? null : { color: 'red' }
            }
            onKeyUp={this.validatePassword}
            placeholder="Verify Password"
            required
          />
        </form>
        <button
          disabled={
            !this.state.form.password.valid ||
            !this.state.form.passwordVerify.valid ||
            !this.state.form.email.valid ||
            !this.state.form.password.value ||
            !this.state.form.passwordVerify.value
          }
          className="submit"
          type="submit"
          onClick={this.createAccount}
        >
          Create
        </button>
        {this.state.error.message ? (
          <div className="errorMessage">{this.state.error.message}</div>
        ) : null}
        {loading}
      </React.Fragment>
    );
  }
}

export default withRouter(Register);
