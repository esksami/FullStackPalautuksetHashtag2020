import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthyearForm from './components/BirthyearForm'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'


const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const storeToken = (token) => {
    setToken(token)
    localStorage.setItem('library-user-token', token)
    setPage('authors')
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token && page !== 'login')
    setPage('login')

  return (
    <div>
     <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>
          recommendations
        </button>
        {token ?
        <button onClick={logout}>logout</button> :
        <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <BirthyearForm
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

      <LoginForm
        show={page === 'login'}
        setError={notify}
        storeToken={storeToken}
      />

    </div>
  )
}

export default App