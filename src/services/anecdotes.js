import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseURL);

  return response.data;
};

const createNew = async content => {
  const anecdote = {
    content, votes: 0
  };
  const response = await axios.post(baseURL, anecdote);

  return response.data;
}

const addVote = async id => {
  const anecdote = await axios.get(baseURL + '/' + id);
  if(anecdote.status === 200) {
    const updatedAnecdote = await axios.patch(baseURL + '/' + id, {
      votes: anecdote.data.votes + 1
    });
    return updatedAnecdote.data;
  }
}

export default { getAll, createNew, addVote };
