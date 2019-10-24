import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks/index';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification, hideNotification, flashNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const newAnecdote = useField('text');

  const createNote = evt => {
    const id = Math.random();
    evt.preventDefault();
    const anecdoteText = evt.target.newAnecdote.value;
    props.createAnecdote(anecdoteText);
    props.showNotification(`Added "${ anecdoteText }"`, id);
    setTimeout(() => {
      props.hideNotification(id);
    }, 5000);
    // TODO: This needs Thunk.
    //flashNotification(props.store.dispatch, `Added "${ anecdoteText }"`)
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
const mapStateToProps = state => ({

});
const mapDispatchToProps = {
  createAnecdote, showNotification, hideNotification
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
