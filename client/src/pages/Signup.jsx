import React from 'react';
import logo from '../images/logo.png';
import MainApi from '../utils/MainApi';

async function handleRegister(email, password, name) {
  await MainApi.signUp({
    email,
    password,
    name,
  });
  window.location = '/signin';
}

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password, name } = this.state;
    await handleRegister(email, password, name);
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
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
            <h1 className="signup__container-wrong">Something goes wrong</h1>
          </form>
          <button className="signup__container-button" type="submit" onClick={this.handleSubmit}>
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
