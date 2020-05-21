import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'


import { ALL_BOOKS, ALL_GENRES, CURRENT_USER } from '../queries'


const Recommendations = (props) => {
  const [user, setUser] = useState('')
  const [books, setBooks] = useState([])

  const userResult = useQuery(CURRENT_USER)

  const [getBooksByGenre, bookResults] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (bookResults.data) {
      setBooks(bookResults.data.allBooks)
    }
  }, [bookResults])

  useEffect(() => {
    if (userResult.data) {
      const currentUser = userResult.data.me
      setUser(currentUser)
      getBooksByGenre({ variables: { genre: currentUser.favoriteGenre } })
    }
  }, [userResult])

  if (bookResults.loading || userResult.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <span>
        books in your favorite genre <b>{user.favoriteGenre}</b>
      </span>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations