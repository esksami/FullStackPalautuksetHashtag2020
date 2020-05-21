import { gql  } from '@apollo/client'


export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query getBooks($author: String, $genre: String) {
    allBooks(
      author: $author,
      genre: $genre
    ) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
        bookCount
      }
      genres
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation setBirthyear($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`