import React from 'react';
import find from '../../images/find.png';
import tumbler from '../../images/smalltumb.png';
import tumbleroff from '../../images/tumbler-off.png';

function onSubmit(e) {
  e.preventDefault();
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tumblerIsOpen: props.tumblerIsOpen,
    };
    this.setTumblerIsOpen = props.setTumblerIsOpen;
    this.setSearch = props.setSearch;
  }

  setLocalTumblerIsOpen() {
    this.setState((prevState) => ({
      tumblerIsOpen: !prevState.tumblerIsOpen,
    }));
  }

  render() {
    const { tumblerIsOpen } = this.state;
    return (
      <section className="searchform">
        <div className="searchform__container">
          <form className="searchform__container-bar" onSubmit={onSubmit}>
            <input
              className="searchform__container-bar-input"
              type="search"
              onChange={this.setSearch}
              id="search"
              name="search"
              placeholder="Movie"
              autoComplete="off"
              required
              key={this.search}
              value={this.search}
            />
            <button className="searchform__container-bar-button" type="submit">
              <img className="searchform__container-bar-pic" src={find} alt="magnifying glass" />
            </button>
          </form>
          <div className="searchform__container-short">
            <p className="searchform__container-short-sign">Short films</p>
            <button
              className="searchform__container-button"
              type="button"
              onClick={() => {
                this.setTumblerIsOpen();
                this.setLocalTumblerIsOpen();
              }}
            >
              { tumblerIsOpen
                ? (
                  <img className="searchform__container-tumbler" src={tumbler} alt="tumbler on" />
                )
                : (
                  <img className="searchform__container-tumbler" src={tumbleroff} alt="tumbler off" />
                )}
            </button>
          </div>
        </div>
      </section>
    );
  }
}
export default SearchForm;
