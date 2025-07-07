const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search");
const filterBtns = document.querySelectorAll(".filters button");
const themeToggle = document.getElementById("theme-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all", search = "") {
  taskList.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter(task => task.text.toLowerCase().includes(search.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""}`;

      const span = document.createElement("span");
      span.textContent = task.text;
      span.addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks(currentFilter, searchInput.value);
      });

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const editBtn = document.createElement("button");
      editBtn.innerHTML = "✏️";
      editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", task.text);
        if (newText) {
          tasks[index].text = newText.trim();
          saveTasks();
          renderTasks(currentFilter, searchInput.value);
        }
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "❌";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(currentFilter, searchInput.value);
      });

      actions.append(editBtn, deleteBtn);
      li.append(span, actions);
      taskList.appendChild(li);
    });
}

// Initial render
let currentFilter = "all";
renderTasks();

// Add task
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks(currentFilter, searchInput.value);
  }
});

// Search tasks
searchInput.addEventListener("input", () => {
  renderTasks(currentFilter, searchInput.value);
});

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks(currentFilter, searchInput.value);
  });
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
