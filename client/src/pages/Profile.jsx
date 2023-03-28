import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header user />
        <section className="profile">
          <div className="profile__container">
            <h1 className="profile__header">Hello,Tatiana!</h1>
            <div className="profile__data profile__data-name">
              <p>Name</p>
              <p>Tatiana</p>
            </div>
            <div className="profile__data">
              <p>E-mail</p>
              <p>pochta@google.com</p>
            </div>

            <div className="profile__bottom">
              <button className="profile__bottom-text" type="submit">Update profile</button>
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
