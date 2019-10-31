import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks/index';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { flashNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const newAnecdote = useField('text');

  const submitAnecdote = async evt => {
    evt.preventDefault();
    const content = evt.target.newAnecdote.value;
    evt.target.newAnecdote.value = '';
    props.createAnecdote(content);

    props.flashNotification(`Added "${ content }"`);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitAnecdote}>
        <div><input name="newAnecdote" {...newAnecdote.props} /></div>
        <button>create</button>
      </form>
    </div>
  );
};

export default connect(null, { createAnecdote, flashNotification })(AnecdoteForm);
