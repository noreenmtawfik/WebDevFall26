"use strict";
// Initial data nafsha zay el screenshot
let todos = [
    { id: 1, text: "See Lecture", completed: false },
    { id: 2, text: "Solve assignment", completed: false }
];
let currentFilter = "all";
// DOM Elements
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const itemsLeft = document.getElementById("itemsLeft");
const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
// Render function: btebny el HTML mn el array
function render() {
    todoList.innerHTML = "";
    // 1. Filter el items
    const filtered = todos.filter((item) => {
        if (currentFilter === "active")
            return !item.completed;
        if (currentFilter === "completed")
            return item.completed;
        return true;
    });
    // 2. E3meli draw l kol li
    filtered.forEach((item) => {
        const li = document.createElement("li");
        if (item.completed) {
            li.classList.add("done");
        }
        const left = document.createElement("div");
        left.className = "left-content";
        // Checkbox
        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.checked = item.completed;
        chk.addEventListener("change", () => {
            item.completed = chk.checked;
            render();
        });
        // Text Span
        const span = document.createElement("span");
        span.textContent = item.text;
        // Double click to edit (enter to save)
        span.addEventListener("dblclick", () => {
            const editBox = document.createElement("input");
            editBox.type = "text";
            editBox.value = item.text;
            left.replaceChild(editBox, span);
            editBox.focus();
            editBox.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && editBox.value.trim() !== "") {
                    item.text = editBox.value.trim();
                    render();
                }
            });
            editBox.addEventListener("blur", () => render());
        });
        left.appendChild(chk);
        left.appendChild(span);
        // Delete button (Trash can icon)
        const delBtn = document.createElement("button");
        delBtn.className = "del-btn";
        delBtn.innerHTML = "&#128465;";
        delBtn.addEventListener("click", () => {
            todos = todos.filter((t) => t.id !== item.id);
            render();
        });
        li.appendChild(left);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });
    // 3. Update counter
    const remaining = todos.filter((t) => !t.completed).length;
    itemsLeft.textContent = `${remaining} items left`;
}
// Add Todo
function addTodo() {
    const val = todoInput.value.trim();
    if (val === "")
        return;
    todos.push({
        id: Date.now(),
        text: val,
        completed: false
    });
    todoInput.value = "";
    render();
}
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        addTodo();
});
// Filters logic
function setFilter(type) {
    currentFilter = type;
    filterAll.className = type === "all" ? "active" : "";
    filterActive.className = type === "active" ? "active" : "";
    filterCompleted.className = type === "completed" ? "active" : "";
    render();
}
filterAll.addEventListener("click", () => setFilter("all"));
filterActive.addEventListener("click", () => setFilter("active"));
filterCompleted.addEventListener("click", () => setFilter("completed"));
// Clear buttons
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.completed);
    render();
});
clearAllBtn.addEventListener("click", () => {
    todos = [];
    render();
});
// First load
render();
