import React, { useEffect } from 'react'
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import { useSelector, useDispatch } from 'react-redux'
import { addVotes, addNew, getAnecdotes } from "./reducers/anecdoteReducer"

const AnecdoteList =
    ({ dispatch, anecdotes }) =>
        <>
            {anecdotes.map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => dispatch(addVotes(anecdote))}>vote</button>
                </div>
              </div>
            )}
        </>

const AnecdoteForm =
    ({ addAnecdote }) =>
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
              <div><input /></div>
              <button>create</button>
            </form>
        </>

const App =
    () => {
        const dispatch = useDispatch()
        const { anecdotes, filter, get } = useSelector(state => state)
        let filtered
        let sorted
        if (anecdotes.length > 0) {
            filtered = anecdotes.filter(({content}) => content.toLowerCase().includes(filter.toLowerCase()))
            sorted = Array.from(filtered.sort((x, y) => y.votes - x.votes))
        }

        useEffect(() => {dispatch(getAnecdotes())}, [dispatch])

        const addAnecdote =
            async e => {
                e.preventDefault()
                const content = e.target[0].value
                e.target.reset()
                dispatch(addNew(content))
            }

        return (
          <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter dispatch={dispatch} />
            {anecdotes.length > 0
                ? <AnecdoteList dispatch={dispatch} anecdotes={sorted} />
                : <></>
            }
            <AnecdoteForm addAnecdote={addAnecdote} />
          </div>
        )
    }

export default App
