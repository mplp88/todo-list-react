import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
//import Clock from './components/Clock';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    }
  }

  render() {
    return (
      <div className="App">
        <NewTodo todos={this.state.todos}></NewTodo>
        <hr></hr>
        <TodoList todos={this.state.todos}></TodoList>
      </div>
    );
  }
}


export default App;
