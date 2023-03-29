import React from 'react';
import logo from '../images/logo.png';
import MainApi from '../utils/MainApi';
import { validateEmail, validatePassword } from '../utils/validation';

async function handleSignIn(email, password) {
  const token = await MainApi.signIn({
    email,
    password,
  });
  if (token.token) {
    localStorage.setItem('token', token.token);
    window.location = '/movies';
  }
}

async function validateInput(params) {
  const { email, password } = params;
  const emailVal = await validateEmail(email);
  const passwordVal = await validatePassword(password);
  return emailVal && passwordVal;
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
      validationErr: false,
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const validate = validateEmail(email) && validatePassword(password);
    if (!validate) return;
    await handleSignIn(email, password);
    this.setState({
      email: '',
      password: '',
      validationErr: true,
    });
  }

  handleEmailChange = async (event) => {
    this.setState({ email: event.target.value });
    const { email, password } = this.state;
    const validate = await validateInput({ email, password });
    if (!validate) {
      this.setState((prev) => ({
        ...prev,
        validationErr: true,
      }));
    } else {
      this.setState((prev) => ({
        ...prev,
        validationErr: false,
      }));
    }
  };

  handlePasswordChange = async (event) => {
    this.setState({ password: event.target.value });
    const { email, password } = this.state;
    const validate = await validateInput({ email, password });
    if (!validate) {
      this.setState((prev) => ({
        ...prev,
        validationErr: true,
      }));
    } else {
      this.setState((prev) => ({
        ...prev,
        validationErr: false,
      }));
    }
  };

  render() {
    const { validationErr } = this.state;
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
            <h1 className={`signup__container-wrong ${validationErr ? 'signup__container-wrong-visible' : ''}`}>Something went wrong</h1>
          </form>
          <button className={`signup__container-button ${validationErr ? 'signup__container-button-disable' : ''}`} type="button" onClick={this.handleSubmit}>
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
