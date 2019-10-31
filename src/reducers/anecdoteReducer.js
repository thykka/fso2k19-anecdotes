import anecdoteService from '../services/anecdotes';

const vote = function (state, id, votes) {
  if(!state.find(anecdote => anecdote.id === id)) return state;
  return state.map(anecdote => anecdote.id !== id ? anecdote : {
    ...anecdote, votes
  });
}

const create = function(state, anecdote) {
  return [...state, anecdote];
}

const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    });
  };
};

const voteAnecdote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(id);
    dispatch({
      type: 'VOTE',
      data: { id, votes: updatedAnecdote.votes }
    });
  };
};

const descendingVotes = (a, b) => b.votes - a.votes;

const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes
    })
  }
};

export { createAnecdote, voteAnecdote, initializeAnecdotes };

const reducer = (state = [], action) => {
  let updatedState = false;
  switch(action.type) {
    case 'CREATE':
      updatedState = create(state, action.data);
      break;
    case 'VOTE':
      updatedState = vote(state, action.data.id, action.data.votes);
      break;
    case 'INITIALIZE_ANECDOTES':
      updatedState = action.data;
      break;
    default:
  }
  return (updatedState ? updatedState : state).sort(descendingVotes);
}

export default reducer
