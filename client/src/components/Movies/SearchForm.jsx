import React from 'react';
import find from '../../images/find.png';
import tumbler from '../../images/smalltumb.png';
import tumbleroff from '../../images/tumbler-off.png';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tumblerIsOpen: props.tumblerIsOpen,
      search: props.search ?? '',
    };
    this.setTumblerIsOpen = props.setTumblerIsOpen;
    this.submitForm = props.submitForm;
    this.setSearch = props.setSearch;
  }

  setLocalTumblerIsOpen() {
    this.setState((prevState) => ({
      tumblerIsOpen: !prevState.tumblerIsOpen,
    }));
  }

  render() {
    const { tumblerIsOpen, search } = this.state;
    return (
      <section className="searchform">
        <div className="searchform__container">
          <form
            className="searchform__container-bar"
            onSubmit={(e) => {
              e.preventDefault();
              if (this.setSearch) this.setSearch(search);
              if (this.submitForm) this.submitForm(search);
            }}
          >
            <input
              className="searchform__container-bar-input"
              type="search"
              onChange={(value) => {
                this.setState((prev) => ({
                  ...prev,
                  search: value.target.value,
                }));
                this.setSearch(value.target.value);
              }}
              id="search"
              name="search"
              placeholder="Movie"
              autoComplete="off"
              required
              key={this.search}
              value={search}
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
