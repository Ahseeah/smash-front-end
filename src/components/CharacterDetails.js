import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'

class CharacterDetails extends Component {
  state = {
    character: {},
    editing: false
  }

  componentDidMount = () => {
    const { game_id, character_id } = this.props.match.params

    axios
      .get(`http://localhost:3000/games/${game_id}/characters/${character_id}`)
      .then(response => {
        this.setState({ character: response.data })
      })
  }

  showDetails = () => {
    const { name } = this.state.character

    return (
      <ul>
        <li>{name}</li>
      </ul>
    )
  }

  updateCharacter = form => {
    const { game_id, character_id } = this.props.match.params

    axios
      .put(
        `http://localhost:3000/games/${game_id}/characters/${character_id}`,
        { character: form.formData }
      )
      .then(response => {
        this.props.history.push(`/games/${game_id}`)
      })
  }

  showEditForm = () => {
    const { name } = this.state.character

    const formSchema = {
      title: 'Character',
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          default: name
        }
      }
    }

    return <Form schema={formSchema} onSubmit={this.updateCharacter} />
  }

  toggleEditing = event => {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    return (
      <>
        {this.state.editing ? this.showEditForm() : this.showDetails()}
        <button onClick={this.toggleEditing}>Edit</button>
        <Link to={`/games/${this.props.match.params.game_id}`}>Back</Link>
      </>
    )
  }
}

export default CharacterDetails
