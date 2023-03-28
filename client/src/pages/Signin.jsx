import React from 'react';
import logo from '../images/logo.png';
import MainApi from '../utils/MainApi';

async function handleSignIn(email, password) {
  const token = await MainApi.signIn({
    email,
    password,
  });
  localStorage.setItem('token', token.token);
  window.location = '/movies';
}

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    await handleSignIn(email, password);
    this.setState({
      email: '',
      password: '',
    });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <section className="signup">
        <div className="signup__container">
          <a href="/">
            <img className="signup__container-logo" alt="my logo green circle" src={logo} />
          </a>
          <h1 className="signup__container-header">Welcome back!</h1>

          <form className="signup__container-form">

            <h1 className="signup__container-input-name">E-mail</h1>
            <input
              className="signup__container-input"
              placeholder="Email"
              type="email"
              onChange={this.handleEmailChange}
            />

            <h1 className="signup__container-input-name">Password</h1>
            <input
              className="signup__container-input"
              placeholder="Password"
              type="password"
              onChange={this.handlePasswordChange}
            />
          </form>
          <button
            className="signup__container-button-signin"
            type="submit"
            onClick={this.handleSubmit}
          >
            Sign In
          </button>
          <div className="signup__bottom">
            <p className="signup__bottom-text">Have no account yet?</p>
            <a className="signup__bottom-link" href="/signup">Sign Up</a>
          </div>
        </div>
      </section>
    );
  }
}

export default Signin;
