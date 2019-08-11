export default class View {
  constructor() {
    this.app = this.getElement('#root');

    this.title = this.createElement('h1');
    this.title.textContent = 'Todo List';

    this.form = this.createElement('form');

    this.input = this.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Add todo';
    this.input.name = 'todo';

    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Add';

    this.todoList = this.createElement('ul', 'todo-list');

    this.form.append(this.input, this.submitButton);

    this.app.append(this.title, this.form, this.todoList);
  }
  get todoText() {
    return this.input.value;
  }

  resetInput() {
    this.input.value = '';
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  render(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    if (todos.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to show';
      this.todoList.append(p);
    } else {
      todos.forEach(todo => {
        const li = this.createElement('li');
        li.id = todo.id;

        const checkbox = this.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.done;

        const span = this.createElement('span');
        span.contentEditable = true;
        span.classList.add('editable');

        if (todo.done) {
          const overline = this.createElement('s');
          overline.textContent = todo.text;
          span.append(overline);
        } else {
          span.textContent = todo.text;
        }

        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(checkbox, span, deleteButton);

        this.todoList.append(li);
      });
    }
  }

  bindEvents(controller) {
    this.form.addEventListener('submit', controller.handleAddTodo);
    this.todoList.addEventListener('click', controller.handleDeleteTodo);
    this.todoList.addEventListener('input', controller.handleEditTodo);
    this.todoList.addEventListener('focusout', controller.handleEditTodoComplete);
    this.todoList.addEventListener('change', controller.handleToggle);
  }
}
