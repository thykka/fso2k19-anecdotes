const vote = function (state, id) {
  if(!state.find(anecdote => anecdote.id === id)) return state;
  return state.map(anecdote => anecdote.id !== id ? anecdote : {
    ...anecdote, votes: anecdote.votes + 1
  });
}

const create = function(state, anecdote) {
  return [...state, anecdote];
}

const createAnecdote = anecdote => {
  return {
    type: 'CREATE',
    data: anecdote
  };
};

const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

const descendingVotes = (a, b) => b.votes - a.votes;

const initializeAnecdotes = anecdotes => ({
  type: 'INITIALIZE_ANECDOTES',
  data: anecdotes
});

export { createAnecdote, voteAnecdote, initializeAnecdotes };

const reducer = (state = [], action) => {
  let updatedState = false;
  switch(action.type) {
    case 'CREATE':
      updatedState = create(state, action.data);
      break;
    case 'VOTE':
      updatedState = vote(state, action.data.id);
      break;
    case 'INITIALIZE_ANECDOTES':
      updatedState = action.data;
      break;
    default:
  }
  return (updatedState ? updatedState : state).sort(descendingVotes);
}

export default reducer
