// Define structure el Todo item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Initial data nafsha zay el screenshot
let todos: Todo[] = [
  { id: 1, text: "See Lecture", completed: false },
  { id: 2, text: "Solve assignment", completed: false }
];

let currentFilter: string = "all";

// DOM Elements
const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const itemsLeft = document.getElementById("itemsLeft") as HTMLSpanElement;

const filterAll = document.getElementById("filterAll") as HTMLButtonElement;
const filterActive = document.getElementById("filterActive") as HTMLButtonElement;
const filterCompleted = document.getElementById("filterCompleted") as HTMLButtonElement;

const clearCompletedBtn = document.getElementById("clearCompletedBtn") as HTMLButtonElement;
const clearAllBtn = document.getElementById("clearAllBtn") as HTMLButtonElement;

// Render function: btebny el HTML mn el array
function render(): void {
  todoList.innerHTML = "";

  // 1. Filter el items
  const filtered = todos.filter((item) => {
    if (currentFilter === "active") return !item.completed;
    if (currentFilter === "completed") return item.completed;
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

      editBox.addEventListener("keydown", (e: KeyboardEvent) => {
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
function addTodo(): void {
  const val = todoInput.value.trim();
  if (val === "") return;

  todos.push({
    id: Date.now(),
    text: val,
    completed: false
  });

  todoInput.value = "";
  render();
}

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") addTodo();
});

// Filters logic
function setFilter(type: string): void {
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
export {};