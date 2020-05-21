import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select';

import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'


const BirthyearForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState(null)

  const [ setBirthyear ] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const result = useQuery(ALL_AUTHORS)


  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const options = authors.map(author => {
    return { value: author.name, label: author.name }
  })

  const submit = async (event) => {
    event.preventDefault()

    setBirthyear({ variables: { name, born } })

    setBorn('')
  }

  const changeSelection = (newSelected) => {
    setSelected(newSelected)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={selected}
          onChange={(option) => {
            setSelected(option)
            setName(option.value)
          }}
          options={options}
        />
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>Confirm</button>
      </form>
    </div>
  )
}

export default BirthyearForm