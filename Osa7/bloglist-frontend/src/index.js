import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import store from './store'

import { GlobalStyle } from './styles';


ReactDOM.render(
  <Router>
    <Provider store={store}>
      <GlobalStyle/>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)



let currentValue
function handleChange() {
  let previousValue = currentValue
  currentValue = store.getState()

  if (previousValue !== currentValue) {
    console.log(
      'State changed from',
      previousValue,
      'to',
      currentValue
    )
  }
}

const unsubscribe = store.subscribe(handleChange)
//unsubscribe()