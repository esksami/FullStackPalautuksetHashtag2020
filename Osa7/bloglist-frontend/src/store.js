import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'


function lastAction(state = null, action) {
  return action;
}

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loginReducer,
  users: userReducer,
  lastAction
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))