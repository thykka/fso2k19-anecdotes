import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { flashNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props;

  const vote = (id) => {
    props.store.dispatch(voteAnecdote(id));
    flashNotification(props.store.dispatch, `Voted "${
      anecdotes.find(a => a.id === id).content
    }"`);
  };

  const visibleAnecdotes = () => {
    if(filter === '') return anecdotes;
    return anecdotes.filter(anecdote => {
      return (anecdote.content || '').toLowerCase().includes(filter.toLowerCase());
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

export default connect(mapStateToProps)(AnecdoteList);
