import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'

const Character = props => {
  const deleteCharacter = event => {
    axios
      .delete(
        `http://localhost:3000/games/${props.game.id}/character/${
          props.character.id
        }`
      )
      .then(response => {
        props.loadGame()
      })
  }

  return (
    <li key={props.character.id}>
      <Link to={`/api/games/${props.game.id}/characters/${props.character.id}`}>
        {props.character.name}
      </Link>
      <button onClick={deleteCharacter}>&times;</button>
    </li>
  )
}

class GameDetails extends Component {
  state = {
    game: {
      characters: []
    }
  }

  loadGame = () => {
    axios
      .get(`http://localhost:3000/api/games/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ game: response.data })
      })
  }

  componentDidMount() {
    this.loadGame()
  }

  deleteGame = event => {
    console.log('Deleting game', this.state.game.id)
    axios
      .delete(`http://localhost:3000/api/games/${this.state.game.id}`)
      .then(response => {
        this.props.history.push('/')
      })
  }

  renderCharacter = () => {
    if (this.state.game.characters.length === 0) {
      return <></>
    }

    return (
      <ul>
        <li>
          Characters:
          <span>{this.state.game.character_count} Characters</span>
        </li>
        {this.state.game.characters.map(character => (
          <Character
            key={character.id}
            game={this.state.game}
            character={character}
            loadGame={this.loadGame}
          />
        ))}
      </ul>
    )
  }

  addCharacter = form => {
    axios
      .post(
        `http://localhost:3000/api/games/${this.state.game.id}/characters`,
        {
          character: form.formData
        }
      )
      .then(response => {
        this.loadGame()
      })
  }

  addCharacterForm = () => {
    const formSchema = {
      title: 'Add a Character',
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Name', default: '' }
      }
    }

    return <Form schema={formSchema} onSubmit={this.addCharacter} />
  }

  render() {
    return (
      <>
        <ul>
          <li>{this.state.game.name}</li>
        </ul>
        {this.renderCharacter()}
        {this.addCharacterForm()}
        <div>
          <Link to={`/games/edit/${this.state.game.id}`}>Edit</Link>
          <button onClick={this.deleteGame}>Delete</button>
        </div>
      </>
    )
  }
}

export default GameDetails
