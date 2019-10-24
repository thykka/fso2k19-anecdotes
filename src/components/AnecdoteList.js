import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { flashNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props.store.getState();

  const vote = (id) => {
    props.store.dispatch(voteAnecdote(id));
    flashNotification(props.store.dispatch, `Voted "${
      anecdotes.find(a => a.id === id).content
    }"`);
  };

  const visibleAnecdotes = () => {
    if(filter === '') return anecdotes;
    return anecdotes.filter(anecdote => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      { visibleAnecdotes().map(anecdote =>
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
