import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks/index';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification, hideNotification, flashNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const newAnecdote = useField('text');

  const submitAnecdote = async evt => {
    const id = Math.random();
    evt.preventDefault();
    const content = evt.target.newAnecdote.value;
    evt.target.newAnecdote.value = '';
    props.createAnecdote(content);

    props.showNotification(`Added "${ content }"`, id);
    setTimeout(() => {
      props.hideNotification(id);
    }, 5000);

    // TODO: This needs Thunk.
    //flashNotification(props.store.dispatch, `Added "${ content }"`)
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

export default connect(null, { createAnecdote, showNotification, hideNotification })(AnecdoteForm);
