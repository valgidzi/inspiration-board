import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    const url = `${this.props.url}${this.props.boardName}/cards`
    axios.get(url)
      .then((response) => {
        this.setState({ cards: response.data });
      })
      .catch((error) => {
        this.setState({error: error.message})
      });
  }




  render() {

    const deleteCard = (cardId) => {
      console.log(`This is in Board: ${cardId}`);
      axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardId}`)
        .then((response) => {
          const cardList = this.state.cards
          const deletedCardIndex = cardList.find( card => card.id === cardId)
          this.state.cards.splice(deletedCardIndex, 1)
          this.setState({cards: cardList})
        })
        .catch((error) => {
          this.setState({error: error.message})
        });
    }

    const cardCollection = this.state.cards.map((card, i) => {
      return <Card key={i}
        id={card.card.id}
        text={card.card.text}
        emoji={card.card.emoji}
        deleteCardCallback={deleteCard}
        />

    });
    return (
      <div className="board">
        Board
        {cardCollection}
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string,
  boardName: PropTypes.string
};

export default Board;
