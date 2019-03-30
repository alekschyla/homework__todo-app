class TodoApp {
    constructor(selector) {
        this.container = document.querySelector(selector) || document.body;

        this.todos = JSON.parse(localStorage.getItem("to-do-list")) || [];
        this.render();
    }

    render() {
        this.container.innerHTML = '';


        this.renderSearch();

        const todoContainer = document.createElement('div');
        todoContainer.classList.add('todos-container');
        this.container.appendChild(todoContainer);

        this.todos.forEach(
            (todo, index) => this.renderTodo(todo, index, todoContainer)
        );
        this.renderForm();
    }

    renderForm() {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const button = document.createElement('button');

        div.classList.add('form-container');
        button.innerText = 'dodaj';
        button.addEventListener('click', () => this.addTodo(input.value));

        div.appendChild(input);
        div.appendChild(button);
        this.container.appendChild(div);
    }

    renderSearch() {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const buttonSearch = document.createElement('button');
        const buttonClear = document.createElement('button');

        div.classList.add('search-container');
        buttonSearch.innerText = 'wyszukaj';
        buttonClear.innerText = 'wyczyść';

        buttonSearch.addEventListener('click', () => {
            this.render();

            const newTodos = this.search(input.value);
            const todosContainer = document.querySelector('.todos-container');

            todosContainer.innerHTML = '';

            newTodos.forEach(
                (todo, index) => this.renderTodo(todo, index, todosContainer)
            );

        });

        buttonClear.addEventListener('click', () => this.render());

        div.appendChild(input);
        div.appendChild(buttonSearch);
        div.appendChild(buttonClear);
        this.container.appendChild(div);
    }

    addTodo(todoText) {
        const newTodo = new Todo(todoText, false);
        this.todos = this.todos.concat(newTodo);
        this.render();
        this.saveTodos();
    }

    deleteTodo(todoIndex) {
        this.todos.splice(todoIndex, 1);
        this.render();
        this.saveTodos();
    }

    renderTodo(todo, index, where) {
        const div = document.createElement("div");
        const span = document.createElement('span');
        const deleteButton = document.createElement('button');

        div.classList.add('todo-container');
        span.classList.add('todo');
        span.innerHTML = todo.todoText;
        deleteButton.innerText = '-';

        if (todo.isCompleted) {
            span.style.textDecoration = "line-through";
        }

        span.addEventListener(
            'click',
            () => this.toggleTodo(index)
        );

        deleteButton.addEventListener(
            'click',
            () => this.deleteTodo(index)
        );

        div.appendChild(span);
        div.appendChild(deleteButton);
        where.appendChild(div);
    }

    toggleTodo(todoIndex) {
        this.todos = this.todos.map(
            (todo, index) => {
                if (index === todoIndex) {
                    return new Todo(todo.todoText, !todo.isCompleted)
                }
                return new Todo(todo.todoText, todo.isCompleted)
            }
        );

        this.render();
        this.saveTodos();
    }

    saveTodos() {
        localStorage.setItem('to-do-list', JSON.stringify(this.todos));
    }

    search(value) {
        value = value.replace(/ /g,'').toLowerCase();
        return this.todos.filter((todo) => todo.todoText.replace(/ /g,'').toLowerCase().includes(value));
    }
}

class Todo {
    constructor(todoText, isCompleted) {
        this.todoText = todoText;
        this.isCompleted = isCompleted;
    }
}