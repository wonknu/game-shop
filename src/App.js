// import { Config } from 'dotenv'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './App.css'

import ItemList from './components/ItemList'

// console.log("dotenv", dotenv)


const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ItemList />
      </Provider>
    )
  }
}

export default App
