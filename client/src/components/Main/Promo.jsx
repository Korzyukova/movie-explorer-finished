import React from 'react';
import promologo from '../../images/promologo.png';

class Promo extends React.Component {
  render() {
    return (
      <section className="promo">
        <div className="promo__text">Hello! This is my final bootcamp project - movie explorer. Please, sign up.</div>
        <div><img className="promo__logo" alt="planet Earth" src={promologo} /></div>
      </section>
    );
  }
}

export default Promo;
