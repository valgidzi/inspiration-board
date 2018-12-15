import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {

  onDeleteClick = () => {
    console.log(`This is in Card: ${this.props.id}`);
    this.props.deleteCardCallback(this.props.id);
  }

  render() {
    const cardEmoji = this.props.emoji ? emoji.getUnicode(this.props.emoji) : ''
    return (
      <section className="card">
        <div className="card__content">
          <div className="card__content-text">
            {this.props.text}
          </div>
          <div className="card__content-emoji">
            {cardEmoji}
          </div>
          <button className="card__delete" onClick={this.onDeleteClick}>Delete Card</button>
        </div>
      </section>
    )
  }
}

Card.propTypes = {
  text: PropTypes.string,
  emoji: PropTypes.string,
  id: PropTypes.number
};

export default Card;
