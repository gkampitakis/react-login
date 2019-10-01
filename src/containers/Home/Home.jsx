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

  test = () => {
    // this.setState({ userId: 5 });
    this.props.history.push('/home/25');
  };

  render() {
    return (
      <React.Fragment>
        <h1>Home Page</h1>
        <button onClick={this.test}>Test update</button>
        <Infowidget id={this.state.userId} />
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
