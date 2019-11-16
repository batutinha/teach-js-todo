class TodoModel {
    text;
    status;

    constructor (text, status) {
        this.text = text;
        this.status = status;
    }

    get text () {
        return this.text;
    }
}

class TodoComponent {
    el = document.querySelector('#todo');
    todos = []
    constructor () {
        this.todoEl = document.querySelector('.todo-list')
        this.registryEvents();
    }

    registryEvents () {
        this.inputKeyup = this.inputKeyup.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.checkItem = this.checkItem.bind(this);
        this.filterComplete = this.filterComplete.bind(this);
        this.el.querySelector('.todo-input').addEventListener('keyup', this.inputKeyup);
        this.el.querySelector('.todo-complete').addEventListener('change', this.filterComplete);
        this.el.querySelector('.todo-form').addEventListener('submit', (e) => e.preventDefault());
    }

    delagateEvent () {
        Array.from(this.todoEl.querySelectorAll('button')).forEach(e => e.addEventListener('click', this.removeItem));
        Array.from(this.todoEl.querySelectorAll('input[type="checkbox"]')).forEach(e => e.addEventListener('change', this.checkItem));
    }

    inputKeyup (e) {
        if (e.which !== 13 || !e.target.value) return;
        this.addItem(e.target.value, false);
        e.target.value = null;
    }

    addItem (text, status) {
        let todo = new TodoModel(text, status);
        this.todos.push(todo);
        this.renderList(this.todos);
    }

    checkItem (e) {
        if (e.target.getAttribute('data-status') == 'true') {
            e.target.parentNode.style.textDecoration = 'none';
            e.target.parentNode.removeAttribute('data-status');
        } else {
            e.target.parentNode.style.textDecoration = 'line-through';
            e.target.parentNode.setAttribute('data-status', true);
        }
    }

    removeItem (e) {
        e.target.parentNode.remove();
        this.todos = this.todos.filter (t => {
            return t.text !== e.target.value;
        });
    }

    filterComplete (e) {
        Array.from(this.todoEl.querySelectorAll('li')).forEach (e => {
            if (e.getAttribute('data-status') == 'true') return;
            e.style.display = 'none';
        });
    }

    renderList (todos) {
        let lis = '';
        todos.forEach (e => {
            lis += ['<li>', e.text, '<input type="checkbox"><button value="', e.text,'">Remove</button></li>'].join('')
        });
        this.todoEl.innerHTML = lis;
        this.delagateEvent();
    }
}


window.addEventListener('load', () => new TodoComponent());