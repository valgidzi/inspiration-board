import React from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

const Card = (props) => {

  const cardText = props.text

  const cardEmoji = props.emoji ? emoji.getUnicode(props.emoji) : ''

  const onDeleteClick = () => {
    props.deleteCardCallback(props.id);
  }

  return (
    <section className="card">
      <div className="card__content">
        <div className="card__content-text">
          {cardText}
        </div>
        <div className="card__content-emoji">
          {cardEmoji}
        </div>
        <button
          className="card__delete"
          onClick={onDeleteClick}>
          DISCARD
        </button>
      </div>
    </section>
  )
}

Card.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  emoji: PropTypes.string,
  deleteCardCallback: PropTypes.func
};

export default Card;
