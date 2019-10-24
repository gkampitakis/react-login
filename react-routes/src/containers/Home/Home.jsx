import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Infowidget from '../../components/InfoWidget/Infowidget';
import './Home.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { whileStatement } from '@babel/types';

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
        <div className="titleBar">
          <h1>Home Page</h1>
          <button className="titleLogOut" onClick={this.logOut}>
            Logout
            <FaSignOutAlt style={{ margin: '0 10px' }} />
          </button>
        </div>

        <Infowidget user={this.state.user} />
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
