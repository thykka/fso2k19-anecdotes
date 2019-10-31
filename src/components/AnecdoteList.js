import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { flashNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotes } = props;

  const vote = (id) => {
    props.voteAnecdote(id);
    props.flashNotification(`Voted "${ anecdotes.find(a => a.id === id).content }"`);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      { props.visibleAnecdotes.map(anecdote =>
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

const filterAnecdotes = ({ anecdotes, filter }) => {
  return filter === ''
    ? anecdotes
    : anecdotes.filter(anecdote =>
        anecdote.content.match(new RegExp(filter, 'i'))
      );
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: filterAnecdotes(state)
  };
};

export default connect(mapStateToProps, { flashNotification, voteAnecdote })(AnecdoteList);
