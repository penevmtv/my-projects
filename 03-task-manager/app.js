function solve() {
    const taskRef = document.getElementById('task');
    const descriptionRef = document.getElementById('description');
    const dateRef = document.getElementById('date');
    const allContainers = document.querySelectorAll('.tasks-container');
    const openDiv = allContainers[0];
    const progressDiv = allContainers[1];
    const completeDiv = allContainers[2];

    document.getElementById('add').addEventListener('click', onClick);

    function onClick() {
        const task = taskRef.value.trim();
        const description = descriptionRef.value.trim();
        const date = dateRef.value.trim();

        if (!task || !description || !date) return;

        const article = createArticle(task, description, date);

        taskRef.value = '';
        descriptionRef.value = '';
        dateRef.value = '';

        openDiv.appendChild(article);
    }

    function onStart(event) {
        const article = event.target.closest('article');
        const divBtns = article.querySelector('.flex');
        event.currentTarget.remove();
        const finishBtn = createBtn('orange', 'Finish', onFinish);
        divBtns.appendChild(finishBtn);
        progressDiv.appendChild(article);
    }

    function onFinish(event) {
        const article = event.target.closest('article');
        const divBtns = article.querySelector('.flex');
        divBtns.remove();
        completeDiv.appendChild(article);
    }

    function onDelete(event) {
        event.target.closest('article').remove();
    }

    function createArticle(task, description, date) {
        const article = document.createElement('article');
        const h3 = document.createElement('h3');
        h3.textContent = task;

        const p1 = document.createElement('p');
        p1.textContent = 'Description: ' + description;

        const p2 = document.createElement('p');
        p2.textContent = 'Due Date: ' + date;

        const div = document.createElement('div');
        div.classList.add("flex");

        const startBtn = createBtn('green', 'Start', onStart);
        const deleteBtn = createBtn('red', 'Delete', onDelete);

        article.append(h3, p1, p2, div);
        div.append(startBtn, deleteBtn);

        return article;
    }

    function createBtn(classList, content, handler) {
        const button = document.createElement('button');
        button.classList.add(classList);
        button.textContent = content;
        button.addEventListener('click', handler);
        return button;
    }
}
solve();
