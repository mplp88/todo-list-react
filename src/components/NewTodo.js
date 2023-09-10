import iziToast from "izitoast";
import React from "react";

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos,
      newTodo: {
        description: ''
      }
    }
  };

  async sendTodo(e) {
    e.preventDefault();

    await fetch('http://localhost:8081/api/todos', {
      method: 'POST',
      body: JSON.stringify(this.state.newTodo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        let todo = json.todo;
        console.log(json)
        let todos = this.state.todos;
        todos.push(todo);
        this.setState({
          todos
        })
      })
      .catch(err => {
        iziToast.show({
          title: 'Error',
          message: err.message,
          icon: 'error'
        });
        console.error(err);
      })
  }

  handleChange(e) {
    this.setState({
      newTodo: {
        description: e.target.value
      }
    })
  }

  render() {
    return (
      <div className="row">
        <form className="col-6 offset-3" onSubmit={e => this.sendTodo(e)}>
          <div className="form-group mb-3">
            <label>New todo</label>
            <input className="form-control" value={this.state.newTodo.description} onChange={e => this.handleChange(e)} id="new-todo" placeholder="Type new To Do description here..." />
          </div>
          <button className="btn btn-primary" type="submit" >Submit</button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
