import React from 'react';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = (props) => {
  return (
    <div>
      <Notification store={ props.store } />
      <Filter store={ props.store } />
      <AnecdoteList store={ props.store } />
      <AnecdoteForm store={ props.store } />
    </div>
  )
}

export default App
