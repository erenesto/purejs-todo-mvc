export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindEvents(this);
    this.view.bindEvents(this);

    this.temporaryEditValue;

    this.onTodoListChanged(this.model.todos);
  }

  onTodoListChanged = todos => this.view.render(todos);

  handleAddTodo = e => {
    e.preventDefault();

    if (this.view.todoText) {
      const todo = {
        id: this.model.todos.length > 0 ? this.model.todos[this.model.todos.length - 1].id + 1 : 1,
        text: this.view.todoText,
        done: false
      };

      this.model.addTodo(todo);
      this.view.resetInput();
    }
  };

  handleEditTodo = event => {
    if (event.target.className === 'editable') {
      this.temporaryEditValue = event.target.innerText;
    }
  };

  handleEditTodoComplete = event => {
    if (this.temporaryEditValue) {
      const id = parseInt(event.target.parentElement.id);

      this.model.editTodo(id, this.temporaryEditValue);
      this.temporaryEditValue = '';
    }
  };

  handleDeleteTodo = event => {
    if (event.target.className === 'delete') {
      const id = parseInt(event.target.parentElement.id);

      this.model.deleteTodo(id);
    }
  };

  // Handle change event for toggling a todo
  handleToggle = event => {
    if (event.target.type === 'checkbox') {
      const id = parseInt(event.target.parentElement.id);

      this.model.toggleTodo(id);
    }
  };
}
