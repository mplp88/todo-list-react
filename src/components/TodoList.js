import iziToast from "izitoast";
import React from "react";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos,
      loading: true
    }
  };

  async componentDidMount() {
    await this.getTodos();
    this.listItems = this.state.todos.map(n =>
      <li key={n.id.toString()}>
        {n.description}
        <input type="checkbox" checked={n.done} id={n.id} onChange={e => this.handleChange(e.target)}></input>
      </li>
    );
  }

  handleChange(target) {
    let checked = target.checked;
    let todos = this.state.todos;
    let todo = todos.find(t => t.id == target.id)
    todo.done = checked;
    this.setState({
      todos
    });

    fetch(`http://localhost:8081/api/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {

        iziToast.show({
          title: 'Success',
          message: 'Updated successfully',
          icon: 'success'
        })
      })
      .catch(err => {
        iziToast.error({
          title: 'Error!',
          message: err.message
        })
      })
  }

  getTodos() {
    fetch('http://localhost:8081/api/todos')
      .then(res => res.json())
      .then(json => {
        console.log(json.todos)
        this.setState({
          todos: json.todos,
          loading: false
        })
      })
      .catch(err => {
        alert('Error cargando ToDos!');
        console.error(err);
      })
  }

  render() {
    const isLoading = this.state.loading;
    let div;

    if (isLoading) {
      div = <div>Loading...</div>
    } else {
      div = <div>
        <table>
          <thead>

          </thead>
          {this.listItems}
        </table>
      </div>
    }

    return (
      <div>
        {div}
      </div>
    );
  }
}

export default TodoList;
