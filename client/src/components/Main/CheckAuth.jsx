/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import checkAuth from '../../utils/checkAuth';

const withAuth = (WrappedComponent) => class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  async componentDidMount() {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
      window.location = '/';
    }

    this.setState({ isAuthenticated });
  }

  render() {
    const { isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <WrappedComponent {...this.props} />;
    }
    return null;
  }
};

export default withAuth;
