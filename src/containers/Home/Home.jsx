import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Infowidget from '../../components/InfoWidget/Infowidget';

class Home extends Component {
  state = {
    userId: ''
  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.setState({ userId: id });
  }

  componentDidUpdate() {
    if (this.state.userId !== this.props.match.params.id)
      this.setState({ userId: this.props.match.params.id }, () => {
        console.log('Hello World');
      });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Home Page</h1>
        <button onClick={this.props.auth.bind(this)}>Log Out</button>
        <Infowidget id={this.state.userId} />
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
