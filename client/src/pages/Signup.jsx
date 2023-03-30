import React from 'react';
import logo from '../images/logo.png';
import MainApi from '../utils/MainApi';
import { validatePassword, validateEmail, validateName } from '../utils/validation';

async function handleRegister(email, password, name) {
  await MainApi.signUp({
    email,
    password,
    name,
  });
  window.location = '/signin';
}

async function validateInput(params) {
  const { email, name, password } = params;
  const emailVal = await validateEmail(email);
  const nameVal = await validateName(name);
  const passwordVal = await validatePassword(password);
  return emailVal && nameVal && passwordVal;
}

class Signup extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    if (token) window.location = '/movies';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      email: '',
      password: '',
      name: '',
      validationErr: false,
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password, name } = this.state;
    const validate = await validateInput({ email, password, name });
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
    await handleRegister(email, password, name);
  }

  handleEmailChange = async (event) => {
    this.setState({ email: event.target.value });
    const { email, name, password } = this.state;
    const validate = await validateInput({ email, password, name });
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
    const { email, name, password } = this.state;
    const validate = await validateInput({ email, password, name });
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

  handleNameChange = async (event) => {
    this.setState({ name: event.target.value });
    const { email, name, password } = this.state;
    const validate = await validateInput({ email, password, name });
    if (!validate) {
      this.setState((prev) => ({
        ...prev,
        validationErr: true,
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
          <h1 className="signup__container-header">Welcome!</h1>

          <form className="signup__container-form">
            <h1 className="signup__container-input-name">Name</h1>
            <input
              className="signup__container-input"
              placeholder="Name"
              type="text"
              onChange={this.handleNameChange}
            />

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
            Sign Up
          </button>
          <div className="signup__bottom">
            <p className="signup__bottom-text">Already have an account?</p>
            <a className="signup__bottom-link" href="/signin">Sign In</a>
          </div>
        </div>
      </section>
    );
  }
}

export default Signup;
