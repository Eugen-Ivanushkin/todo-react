import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { io } from 'socket.io-client';
import 'regenerator-runtime/runtime';

//components
import AppRouter from 'components/app-router';
import NavBar from 'components/nav-bar/nav-bar';
// import { Todo } from 'types/todos';

// const client = io('http://localhost:5000');
// client.on('connect', () => {
//   console.log('I am connected to the server!');
// });

// let taskNumber = 1;
// setInterval(() => {
//   const task: Todo = {
//     _id: Math.floor(Math.random() * 1000).toString(),
//     text: `Task #${taskNumber++}`,
//     isDone: taskNumber % 2 === 0,
//   };

//   client.emit('ADD_TODO', task);
// }, 50000);

// client.on('TODO_ADDED', (task: Todo) => {
//   console.log('Task:', task);
// });

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
