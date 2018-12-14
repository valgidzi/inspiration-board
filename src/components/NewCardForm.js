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



  render() {
  const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]
  const dropdownEmojis = EMOJI_LIST.map((emojiText, i) => {
    return <option
      key={i} value="emoji">{emoji.getUnicode(emojiText)}</option>
  })
    return (
      <div className="new-card-form">
        <form className="new-card-form__form" id="newcardform">
          <div>
            <label htmlFor="Text" className="new-card-form__form-label">Text</label>
            <textarea
              className="new-card-form__form-textarea"
              name="text"
              form="newcardform"
              value={this.state.text}/>
          </div>
          <div>
            <label htmlFor="emoji" className="new-card-form__form-label">Emoji</label>
            <select className="new-card-form__form-select">
              {dropdownEmojis}
            </select>
          </div>
        </form>
      </div>
    )
  }

}

export default NewCardForm;
