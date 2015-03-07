var React = require('react');
var Todo  = require('./todo');
Todo = new Todo();

var TodoList = React.createClass({displayName: "TodoList",
  render: function() {
    var _todos = this.props.todos.map(function(todo) {
      return React.createElement("li", null, todo.title)
    });
    return (React.createElement("ul", null, 
              _todos
            ));
  }
});

var TodoForm = React.createClass({displayName: "TodoForm",
  handleSubmit: function(e) {
    console.log(e);
    console.log('submit button clicked');
    e.preventDefault();

    Todo.add(this.state.formData);
  },
  getInitialState: function () {
    return {
      formData: ""
    }
  },
  render: function() {
    return (React.createElement("form", {onSubmit: this.handleSubmit}, 
              React.createElement("input", {type: "text", text: this.state.formData}), 
              React.createElement("input", {type: "submit", text: "submit"})
            ));
  }
});

var App = React.createClass({displayName: "App",
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
    return (React.createElement("div", null, 
            React.createElement(TodoList, {todos: this.state.todos}), 
            React.createElement(TodoForm, null)
           ));
  }
});

React.render(
    React.createElement(App, null),
    document.getElementById('app-container')
);
