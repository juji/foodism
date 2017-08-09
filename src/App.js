import React, { Component } from 'react';
import 'normalize.css'
import '@blueprintjs/core/dist/blueprint.css'
import './App.css';

import { Provider } from 'react-redux'
import store from './modules/redux-init'
import Map from './modules/ui/Map'
import Navbar from './modules/ui/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

class RestaurantView extends Component {
  componentWillMount = () => {
    import('./modules/ui/RestaurantView').then(Component => {
      this.Component = Component
      this.forceUpdate()
    })
  }
  render = () => (
    this.Component ? <this.Component.default {...this.props} /> : null
  )
}

class App extends Component {
    render() {
        return (
            <Router>
            <Provider store={store}>
                <div className="app">
                    <Map />
                    <Route path="/restaurant/:place" component={RestaurantView} />
                    <Navbar />
                </div>
            </Provider>
            </Router>
        );
    }
}

export default App;
