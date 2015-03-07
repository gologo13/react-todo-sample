var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Todo() {
  if (!(this instanceof Todo)) {
    return new Todo();
  }

  EventEmitter.call(this);

  this._maxId = 3,
  this._data = [
  {
    id: 1,
    title: 'A',
    date: "2015/03/02"
  },
  {
    id: 2,
    title: 'B',
    date: "2015/03/03"
  },
  {
    id: 3,
    title: 'C',
    date: "2015/03/04"
  }
  ];
}

util.inherits(Todo, EventEmitter);

Todo.prototype.todos = function todos() {
  return this._data;
};

Todo.prototype.add = function add(title) {
  this._data.push({
    id: this._maxId++,
    title: title,
    date: "2015/03/07"
  });
  this.emit('change');
};

module.exports = Todo;

if (module === require.main) {
  var t = Todo();
  console.log(t.todos());
}
