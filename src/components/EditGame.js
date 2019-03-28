import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'

class EditGame extends Component {
  state = {
    game: {}
  }

  componentDidMount = () => {
    axios
      .get(`http://localhost:3000/games/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ game: response.data })
      })
  }

  onSubmit = form => {
    console.log(form)

    axios
      .put(`http://localhost:3000/games/${this.props.match.params.id}`, {
        game: form.formData
      })
      .then(response => {
        this.props.history.push(`/games/${this.props.match.params.id}`)
      })
  }

  render() {
    const formSchema = {
      title: 'Game',
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          default: this.state.cohort.name
        }
      }
    }

    return (
      <div>
        <Form schema={formSchema} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default EditGame
