import React from 'react';
import Header from '../components/Header';
import checkAuth from '../utils/checkAuth';
import MainApi from '../utils/MainApi';
import { validateEmail, validateName } from '../utils/validation';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Name',
      email: 'email@example.com',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    checkAuth();
    const { data: me } = await MainApi.getMe();
    console.log(me);
    this.setState(() => ({
      name: me.name,
      email: me.email,
      original: `${me.name}${me.email}`,
    }));
  }

  handleEmailChange(e) {
    this.setState((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  }

  handleNameChange(e) {
    this.setState((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, email } = this.state;
    const validate = validateEmail(email) || validateName(name);
    if (!validate) return;
    await MainApi.patchMe({
      name,
      email,
    });
  }

  render() {
    const { name, email, original } = this.state;
    const change = `${name}${email}` === original;
    return (
      <>
        <Header user />
        <section className="profile">
          <div className="profile__container">
            <form>
              <h1 className="profile__header">
                Hello,
                {' '}
                {name}
                !
              </h1>
              <div className="profile__data profile__data-name">
                <input className="signup__container-input" placeholder="Name" value={name} onChange={this.handleNameChange} />
              </div>
              <div className="profile__data">
                <input
                  className="signup__container-input"
                  type="email"
                  placeholder="Email"
                  onChange={this.handleEmailChange}
                  value={email}
                />
              </div>
            </form>
            <div className="profile__bottom">
              <button className={`profile__bottom-text ${change && 'profile__bottom-text-disabled'}`} type="button" onClick={change ? () => {} : this.handleSubmit}>Update profile</button>
              <a
                className="profile__bottom-link"
                href="/"
                onClick={() => {
                  localStorage.removeItem('token');
                }}
              >
                Sign Out
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Profile;
