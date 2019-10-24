import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { flashNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotes } = props.store.getState();

  const vote = (id) => {
    props.store.dispatch(voteAnecdote(id));
    flashNotification(props.store.dispatch, `Voted "${
      anecdotes.find(a => a.id === id).content
    }"`);
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
    </div>
  )
};

export default AnecdoteList;