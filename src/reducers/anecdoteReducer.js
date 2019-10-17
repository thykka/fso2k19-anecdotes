const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const vote = function (state, id) {
  if(!state.find(anecdote => anecdote.id === id)) return state;
  return state.map(anecdote => anecdote.id !== id ? anecdote : {
    ...anecdote, votes: anecdote.votes + 1
  });
}

const create = function(state, anecdote) {
  return [...state, anecdote];
}

const createAnecdote = content => {
  return {
    type: 'CREATE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  };
};

const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

export { createAnecdote, voteAnecdote };

const reducer = (state = initialState, action) => {
  let updatedState = false;
  switch(action.type) {
    case 'CREATE':
      updatedState = create(state, action.data);
      break;
    case 'VOTE':
      updatedState = vote(state, action.data.id);
      break;
    default:
  }
  return (updatedState ? updatedState : state).sort((a, b) => b.votes - a.votes);
}

export default reducer
