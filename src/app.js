var React = require('react');
var Todo  = require('./todo');
Todo = new Todo();

var TodoList = React.createClass({
  render: function() {
    var _todos = this.props.todos.map(function(todo) {
      return <li>{todo.title}</li>
    });
    return (<ul>
              {_todos}
            </ul>);
  }
});

var TodoForm = React.createClass({
  handleSubmit: function(e) {
    console.log('submit button clicked');
    e.preventDefault();
    Todo.add(this.state.formData);
    this.setState({
      formData: ""
    });
  },
  handleValueChange: function(e) {
    this.setState({
      formData: e.target.value
    });
  },
  getInitialState: function () {
    return {
      formData: ""
    }
  },
  render: function() {
    return (<form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.formData} onChange={this.handleValueChange} />
              <input type="submit" text="submit" />
            </form>);
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      todos: []
    };
  },
  componentDidMount: function () {
    var setTodo = function() {
      console.log('setTodos calls');
      this.setState({
        todos: Todo.todos()
      });
    }.bind(this);
    Todo.on('change', setTodo);
    setTodo();
  },
  render: function() {
    return (<div>
            <TodoList todos={this.state.todos}></TodoList>
            <TodoForm></TodoForm>
           </div>);
  }
});

React.render(
    <App></App>,
    document.getElementById('app-container')
);
