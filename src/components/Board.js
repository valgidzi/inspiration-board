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
        const cards = response.data.map(inputCard => inputCard.card);
        this.setState({ cards: cards });
      })
      .catch((error) => {
        this.setState({error: error.message})
      });
  }

  addCard = (newCard) => {
    axios.post(`${this.props.url}${this.props.boardName}/cards`, newCard)
      .then((response) => {
        const cards = this.state.cards;
        cards.push(response.data.card);
        this.setState({cards, message: 'working'})
      })
      .catch((error) => {
        this.setState({error: error.message})
      });
  };

  deleteCard = (cardId) => {
    console.log(`This is in Board: ${cardId}`);
    axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardId}`)
      .then((response) => {
        const cardList = this.state.cards
        const clickedCard = cardList.find( card => card.id === cardId)
        const clickedCardIndex = cardList.indexOf(clickedCard)
        console.log(clickedCardIndex);
        this.state.cards.splice(clickedCardIndex, 1)
        this.setState({cards: cardList})
      })
      .catch((error) => {
        this.setState({error: error.message})
      });
  }

  render() {



    const cardCollection = this.state.cards.map((card, i) => {
      return <Card key={i}
        id={card.id}
        text={card.text}
        emoji={card.emoji}
        deleteCardCallback={this.deleteCard}
        />

    });
    return (
      <div className="board">
        <NewCardForm addCardCallback={this.addCard}/>
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
