export default class Model {
  constructor() {
    this.todos = [
      { id: 1, text: 'Write code', done: true },
      { id: 2, text: 'Read a book', done: false }
    ];
  }

  bindEvents(controller) {
    this.onTodoListChanged = controller.onTodoListChanged;
  }

  addTodo(todo) {
    this.todos = [...this.todos, todo];

    this.onTodoListChanged(this.todos);
  }

  editTodo(id, updatedTodo) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text: updatedTodo, done: todo.done } : todo
    );

    this.onTodoListChanged(this.todos);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);

    this.onTodoListChanged(this.todos);
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text: todo.text, done: !todo.done } : todo
    );

    this.onTodoListChanged(this.todos);
  }
}
