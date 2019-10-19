import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Register extends Component {
  state = {
    loading: false
  };

  createAccount = e => {
    e.preventDefault();
    this.toggleLoading();
    try {
      this.props.createAccount(); //FIXME:
    } catch (err) {
    } finally {
      this.toggleLoading();
    }
  };

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
        <form></form>
      </React.Fragment>
    );
  }
}

export default withRouter(Register);
