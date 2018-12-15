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
    const getCardsEndpoint = `${this.props.url}${this.props.boardName}/cards`

    axios.get(getCardsEndpoint)
      .then((response) => {
        const cards = response.data.map(responseData => responseData.card);
        this.setState({ cards: cards });
      })
      .catch((error) => {
        this.setState({error: error.message})
      });
  }

  addCard = (newCard) => {
    const addCardEndpoint = `${this.props.url}${this.props.boardName}/cards`

    axios.post(addCardEndpoint, newCard)
      .then((response) => {
        const cards = this.state.cards;
        cards.push(response.data.card);
        this.setState({cards: cards, errors: ''})
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        const errors = error.response.data.errors
        this.setState({errors: errors})
      });
  };

  deleteCard = (cardId) => {
    const deleteCardEndpoint = `${this.props.cardsUrl}${cardId}`

    axios.delete(deleteCardEndpoint)
      .then((response) => {
        const cardList = this.state.cards
        const clickedCard = cardList.find( card => card.id === cardId)
        const clickedCardIndex = cardList.indexOf(clickedCard)

        cardList.splice(clickedCardIndex, 1)
        this.setState({cards: cardList, errors: ''})
      })
      .catch((error) => {
        this.setState({error: error.message})
      });
  }


  render() {

    const cardCollection = this.state.cards.map((card) => {
      return <Card key={card.id}
        id={card.id}
        text={card.text}
        emoji={card.emoji}
        deleteCardCallback={this.deleteCard}
        />
    });

    const validationErrors = this.state.errors ? `Error: ${this.state.errors.text}` : ''

    return (
      <div>
        <div className="validation-errors-display">
          {validationErrors}
        </div>
        <div className="new-card-form">
          <NewCardForm addCardCallback={this.addCard}/>
        </div>
        <div className="board">
          {cardCollection}
        </div>
      </div>
    )
  }

}

Board.propTypes = {
  cardsUrl: PropTypes.string,
  boardsUrl: PropTypes.string,
  boardName: PropTypes.string
};

export default Board;
