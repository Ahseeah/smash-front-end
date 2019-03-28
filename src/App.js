import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import ListGames from './components/ListGames'
import GameDetails from './components/GameDetails'
import CreateGame from './components/CreateGame'
import EditGame from './components/EditGame'
import CharacterDetails from './components/CharacterDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <h1>
          <Link to="/">Smash Games API</Link>
        </h1>
        <Switch>
          <Route exact path="/" component={ListGames} />
          <Route exact path="/games/new" component={CreateGame} />
          <Route exact path="/games/:id" component={GameDetails} />
          <Route exact path="/games/edit/:id" component={EditGame} />
          <Route
            exact
            path="/games/:game_id/characters/:characters_id"
            component={CharacterDetails}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
