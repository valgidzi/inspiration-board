import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

class NewCardForm extends Component {
  constructor() {
    super();

    this.state = {
      text: "",
      emoji: ""
    }
  }

  onInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newState = {};
    newState[field] = value;
    this.setState(newState);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      text: this.state.text,
      emoji: this.state.emoji
    };
    this.props.addCardCallback(newCard);

    this.setState({
      text: '',
      emoji: ''
    });

  }

  render() {
  const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]
  const dropdownEmojis = EMOJI_LIST.map((emojiText, i) => {
    return <option
      key={i} value={emojiText}>{emoji.getUnicode(emojiText)}</option>
  })
    return (
      <form className="new-card-form__form" id="newcardform"
          onSubmit={this.onFormSubmit}>
          <label htmlFor="Text" className="new-card-form__form-label">Text</label>
          <textarea
            className="new-card-form__form-textarea"
            name="text"
            form="newcardform"
            value={this.state.text}
            onChange={this.onInputChange}/>
          <label htmlFor="emoji" className="new-card-form__form-label">Emoji</label>
          <select className="new-card-form__form-select"
            name="emoji"
            value={this.state.emoji}
            onChange={this.onInputChange}>
            {dropdownEmojis}
          </select>
        <input type="submit" value="Create Card" className="new-card-form__form-button"/>
      </form>
    )
  }
}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func,
};

export default NewCardForm;
