import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GameListItem extends Component {
  render() {
    return (
      <Link to={`/games/${this.props.game.id}`}>{this.props.game.name}</Link>
    )
  }
}

export default GameListItem
