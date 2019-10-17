import React from 'react';

import { useField } from './hooks/index';
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer';

const App = (props) => {
  const anecdotes = props.store.getState()
  const newAnecdote = useField('text');

  const vote = (id) => {
    props.store.dispatch(voteAnecdote(id));
  };

  const createNote = evt => {
    evt.preventDefault();
    props.store.dispatch(createAnecdote(evt.target.newAnecdote.value));
    evt.target.newAnecdote.value = '';
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createNote}>
        <div><input name="newAnecdote" {...newAnecdote.props} /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
