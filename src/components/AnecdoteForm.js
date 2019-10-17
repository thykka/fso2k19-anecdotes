import React from 'react';
import { useField } from '../hooks/index';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const newAnecdote = useField('text');

  const createNote = evt => {
    evt.preventDefault();
    props.store.dispatch(createAnecdote(evt.target.newAnecdote.value));
    evt.target.newAnecdote.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNote}>
        <div><input name="newAnecdote" {...newAnecdote.props} /></div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
