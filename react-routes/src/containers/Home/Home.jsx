import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Infowidget from '../../components/InfoWidget/Infowidget';

class Home extends Component {
  state = {
    user: {},
    loading: true
  };

  async componentDidMount() {
    try {
      const { data } = await this.props.getUser();
      this.setState({ user: data, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  logOut = () => {
    this.props.auth();
    this.props.history.push('/login');
  };

  render() {
    return this.state.loading ? null : (
      <React.Fragment>
        <h1>Home Page</h1>

        <Infowidget user={this.state.user} />

        <button onClick={this.logOut}>Log Out</button>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
