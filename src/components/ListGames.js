import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GameListItem from './GameListItem'

class ListGames extends Component {
  state = {
    games: [],
    search: ''
  }

  componentDidMount() {
    axios.get('http://localhost:3000/games').then(response => {
      this.setState({ games: response.data })
    })
  }

  onSearchChange = event => {
    this.setState({ search: event.target.value }, () => {
      axios
        .get(`http://localhost:3000/games?search=${this.state.search}`)
        .then(response => {
          this.setState({ games: response.data })
        })
    })
  }

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.search}
          onChange={this.onSearchChange}
          placeholder="Search here"
        />
        <div>
          {this.state.games.map(game => (
            <GameListItem key={game.id} game={game} />
          ))}
        </div>

        <Link to="/games/new">Create</Link>
      </>
    )
  }
}

export default ListGames
