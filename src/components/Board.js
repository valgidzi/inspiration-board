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
    const cardCollection = this.state.cards.map((card, i) => {
      return <Card key={i}
        text={card.card.text}
        emoji={card.card.emoji}
        />

    });
    return (
      <div>
        Board
        {cardCollection}
      </div>
    )
  }

}

Board.propTypes = {

};

export default Board;
