import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS, ALL_GENRES } from '../queries'


const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])
  const genreResults = useQuery(ALL_GENRES)
  const [getBooksByGenre, bookResults] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooksByGenre({ variables: genre ? { genre } : {} })
  }, [genre])

  useEffect(() => {
    if (bookResults.data) {
      setBooks(bookResults.data.allBooks)
    }
  }, [bookResults])

  if (bookResults.loading || genreResults.loading)  {
    return <div>loading...</div>
  }

  const genres = genreResults.data.allGenres.slice().sort()

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      {genre && <span>in genre <b>{genre}</b></span>}
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
      {genres.map(g =>
        <button onClick={() => setGenre(g)}>{g}</button>
      )}
    </div>
  )
}

export default Books