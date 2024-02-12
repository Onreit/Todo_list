const taskManager = {
    apiEndpoint: 'http://localhost:3000',

    fetchAndInsertTasksFromApi: async function (event) {
        const listTasks = document.querySelector('#list__tasks');
        listTasks.textContent = '';
        const result = await fetch(`${taskManager.apiEndpoint}/tasks`, { method: 'GET' });
        const response = await result.json();
        for (task of response) {
            taskManager.insertTaskInHtml(task);
        }
    },
    insertTaskInHtml: function (taskData) {
        const taskTemplate = document.querySelector('.template-task');
        const newTask = document.importNode(taskTemplate.content, true);

        newTask.querySelector('.task__name').textContent = taskData.name;
        newTask.querySelector('.task__input-name').value = taskData.name;
        newTask.querySelector('.task__input-id').value = taskData.id;
        newTask.querySelector('.task').dataset.id = taskData.id;

        newTask.querySelector('.task__delete').addEventListener(
            'click', taskManager.handleDeleteButton);
        
        newTask.querySelector('.task__edit').addEventListener(
            'click', taskManager.handleEditButton);

        newTask.querySelector('.task__edit-form').addEventListener(
            'submit', taskManager.handleEditForm);
        document.querySelector('.tasks').append(newTask);

    },
    handleCreateForm: async function (event) {
        event.preventDefault();
        const taskFormData = new FormData(event.currentTarget);
        const result = await fetch(`${taskManager.apiEndpoint}/tasks`, { 
            method: 'POST', 
            body: taskFormData
           })
        const response = await result.json()
        taskManager.insertTaskInHtml(response);
    },
    handleDeleteButton: async function (event) {
        const taskHtmlElement = event.currentTarget.closest('.task');
        const taskId = taskHtmlElement.dataset.id;
        if (confirm('Etes-vous sûr de bien vouloir supprimer la tâche ?')) {
            await fetch(`${taskManager.apiEndpoint}/tasks/${taskId}`, {
                method: 'DELETE'
              })
           await taskManager.fetchAndInsertTasksFromApi();
        }
    },
    handleEditButton: function (event) {
        const taskHtmlElement = event.currentTarget.closest('.task');
        taskHtmlElement.querySelector('.task__edit-form').style.display = 'flex';
        taskHtmlElement.querySelector('.task__name').style.display = 'none';
    },
    handleEditForm: async function (event) {

        event.preventDefault();
        const taskHtmlElement = event.currentTarget.closest('.task');
        const taskFormData = new FormData(event.currentTarget);
        const taskId = taskFormData.get('id');
        const result = await fetch(`${taskManager.apiEndpoint}/tasks/${taskId}`, { 
            method: 'PATCH', 
            body: taskFormData
           })
        taskHtmlElement.querySelector('.task__name').textContent = taskFormData.get('name');
        taskHtmlElement.querySelector('.task__edit-form').style.display = 'none';
        taskHtmlElement.querySelector('.task__name').style.display = 'block';
        await taskManager.fetchAndInsertTasksFromApi();
    }

};
