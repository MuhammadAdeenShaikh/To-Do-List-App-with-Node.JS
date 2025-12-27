// const inputtask = document.getElementById("newtask");
// const list = document.getElementById("list-container");

// function AddTask() {

//     if (inputtask.value === "") {
//         alert("Please enter some text!");
//         return;
//     } else {

//     //  Create li
//     const li = document.createElement("li");
//     li.className = "task-item";

//     //  Task text
//     const span = document.createElement("span");
//     span.className = "task-text";
//     span.innerText = inputtask.value;

//     //  Action div
//     const actions = document.createElement("div");
//     actions.className = "task-actions";

//     //  Edit icon
//     const edit = document.createElement("i");
//     edit.className = "fa-solid fa-pen edit";

//     //  Delete icon
//     const del = document.createElement("i");
//     del.className = "fa-solid fa-trash delete";
    
//      // EDIT FUNCTIONALITY
//     edit.onclick = function () {
//         const newText = prompt("Edit your task:", span.innerText);

//         if (newText !== null && newText.trim() !== "") {
//             span.innerText = newText;
//         }
//     }

//     //  delete Functionality
//     del.onclick = function () {
//         li.remove();
//     }

//     // Append icons
//     actions.appendChild(edit);
//     actions.appendChild(del);

//     // Append everything
//     li.appendChild(span);
//     li.appendChild(actions);
//     list.appendChild(li);

//     // Clear input
//     inputtask.value = "";
//     }
// }


const inputtask = document.getElementById("newtask");
const list = document.getElementById("list-container");

// Fetch tasks on page load
window.onload = async () => {
    const res = await fetch("/tasks");
    const tasks = await res.json();
    tasks.forEach((task, index) => addTaskToDOM({ ...task, id: index }));
};

async function AddTask() {
    if (inputtask.value === "") {
        alert("Please enter some text!");
        return;
    }

    const res = await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputtask.value })
    });

    const newTaskData = await res.json();
    const lastTask = newTaskData.tasks[newTaskData.tasks.length - 1];
    addTaskToDOM({ ...lastTask, id: newTaskData.tasks.length - 1 });

    inputtask.value = "";
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.className = "task-item";

    const span = document.createElement("span");
    span.className = "task-text";
    span.innerText = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Edit button
    const edit = document.createElement("i");
    edit.className = "fa-solid fa-pen edit";
    edit.onclick = () => {
        const newText = prompt("Edit your task:", span.innerText);
        if (newText !== null && newText.trim() !== "") {
            span.innerText = newText;
        }
    };

    // Delete button
    const del = document.createElement("i");
    del.className = "fa-solid fa-trash delete";
    del.onclick = async () => {
        await fetch(`/tasks/${task.id}`, { method: "DELETE" });
        li.remove();
    };

    actions.appendChild(edit);
    actions.appendChild(del);

    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
}
