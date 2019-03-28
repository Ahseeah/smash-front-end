import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import axios from 'axios'

class CreateGame extends Component {
  onSubmit = form => {
    console.log(form)

    axios
      .post('http://localhost:3000/games', {
        game: form.formData
      })
      .then(response => {
        this.props.history.push('/')
      })
  }

  render() {
    const formSchema = {
      title: 'Game',
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Name', default: '' }
      }
    }

    return (
      <div>
        <Form schema={formSchema} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default CreateGame
