class TodoApp {
    constructor(selector) {
        this.container = document.querySelector(selector) || document.body;

        this.todos = JSON.parse(localStorage.getItem("to-do-list")) || [];
        this.render();
    }

    render(){
        this.container.innerHTML = '';

        this.renderForm();
        this.todos.forEach(
            (todo, index) => this.renderTodo(todo, index)
        );
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

    addTodo(todoText) {
        const newTodo = new Todo(todoText);
        this.todos = this.todos.concat(newTodo);
        this.render();
        this.saveTodos();
    }

    deleteTodo(todoIndex) {
        this.todos.splice(todoIndex, 1);
        this.render();
        this.saveTodos();
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
        this.container.appendChild(div);
    }

    toggleTodo(todoIndex) {
        this.todos = this.todos.map(
            (todo, index) => {
                if (index === todoIndex) {
                    return {
                        todoText: todo.todoText,
                        isCompleted: !todo.isCompleted
                    }
                }
                return todo;
            }
        );

        this.render();
        this.saveTodos();
    }

    saveTodos() {
        localStorage.setItem('to-do-list', JSON.stringify(this.todos));
    }
}

class Todo {
    constructor(todoText) {
        this.todoText = todoText;
        this.isCompleted = false;
    }
}