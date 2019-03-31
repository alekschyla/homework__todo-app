class TodoApp {
    constructor(selector) {
        this.container = document.querySelector(selector) || document.body;

        this.todosContainer = document.createElement('div');
        this.todosContainer.classList.add('todos-container');

        this.todos = JSON.parse(localStorage.getItem("to-do-list")) || [];
        this.render();
    }

    render() {
        this.container.innerHTML = '';

        this.renderSearch();
        this.renderButtons();
        this.renderTodoList();
        this.renderForm();
    }

    addTodo(todoText) {
        if (todoText !== '') {
            const newTodo = new Todo(todoText, false);
            this.todos = this.todos.concat(newTodo);
            this.render();
            this.saveTodos();
        }
    }

    deleteTodo(todoIndex) {
        this.todos.splice(todoIndex, 1);
        this.render();
        this.saveTodos();
    }

    renderButtons() {
        const div = document.createElement('div');
        const buttonAll = document.createElement('button');
        const buttonCompleted = document.createElement('button');
        const buttonNotCompleted = document.createElement('button');

        div.classList.add('buttons-container');
        buttonAll.innerText = 'wszystkie';
        buttonCompleted.innerText = 'zakończone';
        buttonNotCompleted.innerText = 'nie zakończone';

        buttonAll.addEventListener('click', () => this.render());
        buttonCompleted.addEventListener('click', () => {
            this.render();
            this.todosContainer.innerHTML = '';

            const completedTodos = this.completedTodos();

            completedTodos.forEach(
                (todo, index) => this.renderTodo(todo, index)
            );
        });

        buttonNotCompleted.addEventListener('click', () => {
            this.render();
            this.todosContainer.innerHTML = '';

            const notCompletedTodos = this.notCompletedTodos();

            notCompletedTodos.forEach(
                (todo, index) => this.renderTodo(todo, index)
            );
        });

        div.appendChild(buttonAll);
        div.appendChild(buttonCompleted);
        div.appendChild(buttonNotCompleted);

        this.container.appendChild(div);
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
            this.todosContainer.innerHTML = '';

            const newTodos = this.search(input.value);

            newTodos.forEach(
                (todo, index) => this.renderTodo(todo, index)
            );
        });

        buttonClear.addEventListener('click', () => this.render());

        div.appendChild(input);
        div.appendChild(buttonSearch);
        div.appendChild(buttonClear);
        this.container.appendChild(div);
    }

    renderTodo(todo, index) {
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
        this.todosContainer.appendChild(div);
    }

    renderTodoList() {
        this.todosContainer.innerHTML = '';
        this.container.appendChild(this.todosContainer);

        this.todos.forEach(
            (todo, index) => this.renderTodo(todo, index)
        );
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

    completedTodos() {
        return this.todos.filter(todo => todo.isCompleted === true);
    }

    notCompletedTodos() {
        return this.todos.filter(todo => todo.isCompleted === false);
    }
}

class Todo {
    constructor(todoText, isCompleted) {
        this.todoText = todoText;
        this.isCompleted = isCompleted;
    }
}